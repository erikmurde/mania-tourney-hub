package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.Event;
import com.tourneyhub.backend.domain.EventParticipant;
import com.tourneyhub.backend.domain.Stage;
import com.tourneyhub.backend.domain.exception.AppException;
import com.tourneyhub.backend.dto.match.MatchCreateDto;
import com.tourneyhub.backend.dto.match.MatchDto;
import com.tourneyhub.backend.dto.match.MatchEditDto;
import com.tourneyhub.backend.dto.match.MatchResultDto;
import com.tourneyhub.backend.mapper.MatchMapper;
import com.tourneyhub.backend.repository.RepositoryUow;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.tourneyhub.backend.helper.Constants.*;

@Service
public class MatchService {

    private final RepositoryUow uow;

    private final EventService eventService;

    private final EventParticipantService participantService;

    private final ScoreService scoreService;

    private final UserService userService;

    private final MatchMapper mapper;

    public MatchService(
            RepositoryUow uow,
            EventService eventService,
            EventParticipantService participantService,
            ScoreService scoreService,
            UserService userService,
            MatchMapper mapper)
    {
        this.uow = uow;
        this.eventService = eventService;
        this.participantService = participantService;
        this.scoreService = scoreService;
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
                .orElseThrow(() -> new AppException(
                        String.format("No stage with ID %d.", dto.getStageId()), HttpStatus.NOT_FOUND));

        if (!userService.hasAnyRole(stage.getTournamentId(), principal, HOST, ADMIN)) {
            throw new AppException(NO_PERMISSION, HttpStatus.FORBIDDEN);
        }
        if (!stage.getStageType().getName().equals("standard") || dto.getCommentatorIds().size() > 2) {
            throw new AppException("Invalid stage type or too many commentators!", HttpStatus.BAD_REQUEST);
        }
        Event match = mapper.mapToEntity(dto, stage);

        participantService.addParticipant(match, dto.getPlayer1Id(), PLAYER, dto.isTeams());
        participantService.addParticipant(match, dto.getPlayer2Id(), PLAYER, dto.isTeams());
        participantService.addReferee(match, dto.getRefereeId());
        participantService.addStreamer(match, dto.getStreamerId());
        participantService.addCommentators(match, dto.getCommentatorIds());

        return uow.eventRepository.save(match).getId();
    }

    public Long update(Long id, MatchEditDto dto, OAuth2User principal) {
        Event match = getMatchAndValidateRights(id, principal, HOST, ADMIN);

        participantService.removeParticipants(match, REFEREE);
        participantService.removeParticipants(match, STREAMER);
        participantService.removeParticipants(match, COMMENTATOR);

        participantService.addReferee(match, dto.getRefereeId());
        participantService.addStreamer(match, dto.getStreamerId());
        participantService.addCommentators(match, dto.getCommentatorIds());

        match.setCode(dto.getCode());
        match.setTime(dto.getTime());
        return uow.eventRepository.save(match).getId();
    }

    public Long registerStaff(Long id, Long userId, String role, OAuth2User principal) {
        Event match = getMatchAndValidateRights(id, principal, REFEREE, STREAMER, COMMENTATOR);
        List<EventParticipant> participants = participantService.getParticipants(match, role);
        boolean commentator = role.equals(COMMENTATOR);

        // TODO check if participant is same as logged in user

        if (!commentator && !participants.isEmpty() || commentator && participants.size() == 2) {
            throw new AppException("Staff already present!", HttpStatus.BAD_REQUEST);
        }
        participantService.addParticipant(match, userId, role, false);
        return uow.eventRepository.save(match).getId();
    }

    public Long unregisterStaff(Long id, Long userId, String role, OAuth2User principal) {
        Event match = getMatchAndValidateRights(id, principal, REFEREE, STREAMER, COMMENTATOR);

        // TODO check if participant is same as logged in user

        participantService.removeParticipant(match, userId, role, false);
        return uow.eventRepository.save(match).getId();
    }

    public Long conclude(Long id, MatchResultDto dto, OAuth2User principal) {
        Event match = getMatchAndValidateRights(id, principal, HOST, ADMIN, REFEREE);
        List<EventParticipant> players = participantService.getParticipants(match, PLAYER);

        boolean isWbd = dto.getMatchId() == null;
        Integer s1 = dto.getScore1();
        Integer s2 = dto.getScore2();

        if (!isWbd && (s1 < 0 || s2 < 0) || isWbd && (s1 >= 0 && s2 >= 0 || s1 < 0 && s2 < 0)) {
            throw new AppException("Invalid scores!", HttpStatus.BAD_REQUEST);
        }
        players.get(0).setScore(s1);
        players.get(1).setScore(s2);

        if (!isWbd) {
            scoreService.createScores(match.getStage().getId(), dto.getMatchId(), match);
        }
        match.setMatchId(dto.getMatchId());
        match.setConcluded(true);
        return uow.eventRepository.save(match).getId();
    }

    private Event getMatchAndValidateRights(Long matchId, OAuth2User principal, String... roles) {
        Event match = eventService.getEvent(matchId);
        Long tournamentId = match.getStage().getTournamentId();

        if (!userService.hasAnyRole(tournamentId, principal, roles)) {
            throw new AppException(NO_PERMISSION, HttpStatus.FORBIDDEN);
        }
        return match;
    }
}
