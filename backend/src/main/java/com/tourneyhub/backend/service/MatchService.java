package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.Event;
import com.tourneyhub.backend.domain.EventParticipant;
import com.tourneyhub.backend.domain.Stage;
import com.tourneyhub.backend.dto.match.MatchCreateDto;
import com.tourneyhub.backend.dto.match.MatchDto;
import com.tourneyhub.backend.dto.match.MatchEditDto;
import com.tourneyhub.backend.dto.match.MatchResultDto;
import com.tourneyhub.backend.mapper.MatchMapper;
import com.tourneyhub.backend.repository.RepositoryUow;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MatchService {

    private final RepositoryUow uow;

    private final EventService eventService;

    private final EventParticipantService participantService;

    private final MapScoreService mapScoreService;

    private final UserService userService;

    private final MatchMapper mapper;

    public MatchService(
            RepositoryUow uow,
            EventService eventService,
            EventParticipantService participantService,
            MapScoreService mapScoreService,
            UserService userService,
            MatchMapper mapper)
    {
        this.uow = uow;
        this.eventService = eventService;
        this.participantService = participantService;
        this.mapScoreService = mapScoreService;
        this.userService = userService;
        this.mapper = mapper;
    }

    public List<MatchDto> getAllByStageId(Long stageId) {
        return uow.eventRepository
                .getAllByStageId(stageId).stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public Long create(MatchCreateDto dto, OAuth2User principal) {
        Stage stage = uow.stageRepository
                .findById(dto.getStageId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (!userService.hasAnyRole(stage.getTournamentId(), principal, "host", "admin")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        if (!stage.getStageType().getName().equals("standard") || dto.getCommentatorIds().size() > 2) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Event match = mapper.mapToEntity(dto, stage);

        participantService.addParticipant(match, dto.getPlayer1Id(), "player", dto.isTeams());
        participantService.addParticipant(match, dto.getPlayer2Id(), "player", dto.isTeams());
        participantService.addReferee(match, dto.getRefereeId());
        participantService.addStreamer(match, dto.getStreamerId());
        participantService.addCommentators(match, dto.getCommentatorIds());

        return uow.eventRepository.save(match).getId();
    }

    public Long update(Long id, MatchEditDto dto, OAuth2User principal) {
        Event match = getMatchAndValidateRights(id, principal, "host", "admin");

        participantService.removeParticipants(match, "referee");
        participantService.removeParticipants(match, "streamer");
        participantService.removeParticipants(match, "commentator");

        participantService.addReferee(match, dto.getRefereeId());
        participantService.addStreamer(match, dto.getStreamerId());
        participantService.addCommentators(match, dto.getCommentatorIds());

        match.setCode(dto.getCode());
        match.setTime(dto.getTime());
        return uow.eventRepository.save(match).getId();
    }

    public Long registerStaff(Long id, Long userId, String role, OAuth2User principal) {
        Event match = getMatchAndValidateRights(id, principal, "referee", "streamer", "commentator");
        List<EventParticipant> participants = participantService.getParticipants(match, role);
        boolean commentator = role.equals("commentator");

        // TODO check if participant is same as logged in user

        if (!commentator && !participants.isEmpty() || commentator && participants.size() == 2) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        participantService.addParticipant(match, userId, role, false);
        return uow.eventRepository.save(match).getId();
    }

    public Long unregisterStaff(Long id, Long userId, String role, OAuth2User principal) {
        Event match = getMatchAndValidateRights(id, principal, "referee", "streamer", "commentator");

        // TODO check if participant is same as logged in user

        participantService.removeParticipant(match, userId, role, false);
        return uow.eventRepository.save(match).getId();
    }

    public Long conclude(Long id, MatchResultDto dto, OAuth2User principal) {
        Event match = getMatchAndValidateRights(id, principal, "host", "admin", "referee");
        List<EventParticipant> players = participantService.getParticipants(match, "player");

        boolean isWbd = dto.getMatchId() == null;
        Integer s1 = dto.getScore1();
        Integer s2 = dto.getScore2();

        if (!isWbd && (s1 < 0 || s2 < 0) || isWbd && (s1 >= 0 && s2 >= 0 || s1 < 0 && s2 < 0)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        players.get(0).setScore(s1);
        players.get(1).setScore(s2);

        if (!isWbd) {
            mapScoreService.createScores(match.getStage().getId(), dto.getMatchId());
        }
        match.setMatchId(dto.getMatchId());
        match.setConcluded(true);
        return uow.eventRepository.save(match).getId();
    }

    private Event getMatchAndValidateRights(Long matchId, OAuth2User principal, String... roles) {
        Event match = eventService.getEvent(matchId);
        Long tournamentId = match.getStage().getTournamentId();

        if (!userService.hasAnyRole(tournamentId, principal, roles)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        return match;
    }
}
