package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.*;
import com.tourneyhub.backend.dto.lobby.LobbyCreateDto;
import com.tourneyhub.backend.dto.lobby.LobbyDto;
import com.tourneyhub.backend.dto.lobby.LobbyEditDto;
import com.tourneyhub.backend.dto.lobby.LobbyRegisterDto;
import com.tourneyhub.backend.mapper.LobbyMapper;
import com.tourneyhub.backend.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class LobbyService {

    private final RepositoryUow uow;

    private final EventService eventService;

    private final EventParticipantService participantService;

    private final UserService userService;

    private final LobbyMapper mapper;

    public LobbyService(
            RepositoryUow uow,
            EventService eventService,
            EventParticipantService eventParticipantService,
            UserService userService,
            LobbyMapper mapper)
    {
        this.uow = uow;
        this.eventService = eventService;
        this.userService = userService;
        this.participantService = eventParticipantService;
        this.mapper = mapper;
    }

    public List<LobbyDto> getAllByStageId(Long stageId, OAuth2User principal) {
        Stage stage = fetchStage(stageId);
        Tournament tournament = stage.getTournament();

        if ((!stage.isSchedulePublished() || !tournament.isPublished())
                && !userService.hasAnyRole(tournament.getId(), principal, "host", "admin", "referee")) {
            return new ArrayList<>();
        }
        return uow.eventRepository
                .getAllByStageId(stageId)
                .stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public Long create(LobbyCreateDto dto, OAuth2User principal) {
        Stage stage = fetchStage(dto.getStageId());
        Long refereeId = getId(dto.getReferee(), false);

        if (!userService.isHost(stage.getTournamentId(), principal)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        if (!stage.getStageType().getName().equals("qualifier")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Event lobby = mapper.mapToEntity(dto, stage);
        participantService.addReferee(lobby, refereeId);

        return uow.eventRepository.save(lobby).getId();
    }

    public Long update(Long lobbyId, LobbyEditDto dto, OAuth2User principal) {
        Event lobby = eventService.getEvent(lobbyId);
        boolean isHost = userService.isHost(lobby.getStage().getTournamentId(), principal);

        if (lobby.isConcluded() || dto.isConcluded()
                && dto.getMatchId() == null
                && !participantService.getParticipants(lobby, "player").isEmpty())
        {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (isHost) {
            participantService.removeParticipants(lobby, "referee");
            participantService.addReferee(lobby, getId(dto.getReferee(), false));
        }

        // TODO create map scores

        if (isHost) {
            lobby.setTime(dto.getTime());
        }
        lobby.setMatchId(dto.getMatchId());
        lobby.setConcluded(dto.isConcluded());
        return uow.eventRepository.save(lobby).getId();
    }

    public Long registerParticipant(Long lobbyId, LobbyRegisterDto dto, OAuth2User principal) {
        Long participantId = getId(dto.getParticipant(), dto.isTeam());
        Event lobby = eventService.getEvent(lobbyId);
        Stage stage = lobby.getStage();

        // TODO check if participant is same as logged in user or captain of the team

        // TODO check if player has already registered in another lobby

        if (!userService.hasAnyRole(stage.getTournamentId(), principal, "player", "referee")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        boolean full = participantService.getParticipants(lobby, "player").size() == stage.getLobbySize();

        if (full || dto.isReferee() && !participantService.getParticipants(lobby, "referee").isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        participantService.addParticipant(
                lobby, participantId, dto.isReferee() ? "referee" : "player", dto.isTeam()
        );
        return uow.eventRepository.save(lobby).getId();
    }

    public Long unregisterParticipant(Long lobbyId, LobbyRegisterDto dto, OAuth2User principal) {
        Long participantId = getId(dto.getParticipant(), dto.isTeam());
        Event lobby = eventService.getEvent(lobbyId);
        Stage stage = lobby.getStage();

        if (lobby.isConcluded() || stage.getTournament().isConcluded()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (!userService.hasAnyRole(stage.getTournamentId(), principal, "player", "referee")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        // TODO check if participant is same as logged in user or captain of the team

        participantService.removeParticipant(
                lobby, participantId, dto.isReferee() ? "referee" : "player", !dto.isReferee() && dto.isTeam()
        );
        return uow.eventRepository.save(lobby).getId();
    }

    private Long getId(String participant, boolean team) {
        if (team) {
            return uow.teamRepository
                    .findByName(participant)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND))
                    .getId();
        } else {
            return uow.userRepository
                    .findByName(participant)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND))
                    .getId();
        }
    }

    private Stage fetchStage(Long stageId) {
        return uow.stageRepository
                .findById(stageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
