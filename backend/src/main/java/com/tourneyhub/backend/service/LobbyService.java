package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.*;
import com.tourneyhub.backend.domain.exception.AppException;
import com.tourneyhub.backend.dto.lobby.LobbyCreateDto;
import com.tourneyhub.backend.dto.lobby.LobbyDto;
import com.tourneyhub.backend.dto.lobby.LobbyEditDto;
import com.tourneyhub.backend.dto.lobby.LobbyRegisterDto;
import com.tourneyhub.backend.helper.Constants;
import com.tourneyhub.backend.mapper.LobbyMapper;
import com.tourneyhub.backend.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LobbyService {

    private final RepositoryUow uow;

    private final ScoreService scoreService;

    private final EventService eventService;

    private final EventParticipantService participantService;

    private final UserService userService;

    private final LobbyMapper mapper;

    public LobbyService(
            RepositoryUow uow,
            ScoreService scoreService,
            EventService eventService,
            EventParticipantService eventParticipantService,
            UserService userService,
            LobbyMapper mapper)
    {
        this.uow = uow;
        this.scoreService = scoreService;
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
            throw new AppException(Constants.NO_PERMISSION, HttpStatus.FORBIDDEN);
        }
        if (!stage.getStageType().getName().equals("qualifier")) {
            throw new AppException("Invalid stage type!", HttpStatus.BAD_REQUEST);
        }
        Event lobby = mapper.mapToEntity(dto, stage);
        participantService.addReferee(lobby, refereeId);

        return uow.eventRepository.save(lobby).getId();
    }

    public Long update(Long lobbyId, LobbyEditDto dto, OAuth2User principal) {
        Event lobby = eventService.getEvent(lobbyId);
        List<EventParticipant> players = participantService.getParticipants(lobby, "player");
        boolean isHost = userService.isHost(lobby.getStage().getTournamentId(), principal);

        if (lobby.isConcluded() || dto.isConcluded() && dto.getMatchId() == null && !players.isEmpty()) {
            throw new AppException("Lobby already concluded or match id missing!", HttpStatus.BAD_REQUEST);
        }
        if (isHost && dto.getReferee() != null) {
            participantService.removeParticipants(lobby, "referee");
            participantService.addReferee(lobby, getId(dto.getReferee(), false));
        }
        if (!players.isEmpty()) {
            scoreService.createScores(lobby.getStage().getId(), dto.getMatchId(), lobby);
        }
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

        validateUserRoles(stage.getTournamentId(), principal);

        boolean full = participantService.getParticipants(lobby, "player").size() == stage.getLobbySize();

        if (full || dto.isReferee() && !participantService.getParticipants(lobby, "referee").isEmpty()) {
            throw new AppException("Players list full or referee already present!", HttpStatus.BAD_REQUEST);
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

        validateUserRoles(stage.getTournamentId(), principal);

        if (lobby.isConcluded() || stage.getTournament().isConcluded()) {
            throw new AppException("Lobby or tournament is concluded!", HttpStatus.BAD_REQUEST);
        }
        // TODO check if participant is same as logged in user or captain of the team

        participantService.removeParticipant(
                lobby, participantId, dto.isReferee() ? "referee" : "player", !dto.isReferee() && dto.isTeam()
        );
        return uow.eventRepository.save(lobby).getId();
    }

    private void validateUserRoles(Long tournamentId, OAuth2User principal) {
        if (!userService.hasAnyRole(tournamentId, principal, "player", "referee")) {
            throw new AppException(Constants.NO_PERMISSION, HttpStatus.FORBIDDEN);
        }
    }

    private Long getId(String participant, boolean team) {
        if (team) {
            return uow.teamRepository
                    .findByName(participant)
                    .orElseThrow(() -> new AppException(
                            String.format("No team with name %s", participant), HttpStatus.NOT_FOUND)
                    )
                    .getId();
        } else {
            return uow.userRepository
                    .findByName(participant)
                    .orElseThrow(() ->new AppException(
                            String.format("No user with name %s", participant), HttpStatus.NOT_FOUND)
                    )
                    .getId();
        }
    }

    private Stage fetchStage(Long id) {
        return uow.stageRepository
                .findById(id)
                .orElseThrow(() -> new AppException(
                        String.format("No stage with id %d", id), HttpStatus.NOT_FOUND));
    }
}
