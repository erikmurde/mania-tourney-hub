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
import java.util.Optional;

@Service
public class LobbyService {

    private final UserService userService;

    private final EventRepository eventRepository;

    private final StageRepository stageRepository;

    private final RoleRepository roleRepository;

    private final UserRepository userRepository;

    private final TeamRepository teamRepository;

    private final LobbyMapper mapper;

    public LobbyService(
            UserService userService,
            EventRepository eventRepository,
            StageRepository stageRepository,
            RoleRepository roleRepository,
            UserRepository userRepository,
            TeamRepository teamRepository,
            LobbyMapper mapper)
    {
        this.userService = userService;
        this.eventRepository = eventRepository;
        this.stageRepository = stageRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.mapper = mapper;
    }

    public List<LobbyDto> getAllByStageId(Long stageId, OAuth2User principal) {
        Stage stage = fetchStage(stageId);
        Tournament tournament = stage.getTournament();

        if ((!stage.isSchedulePublished() || !tournament.isPublished())
                && !userService.hasAnyRole(tournament.getId(), principal, "host", "admin", "referee")) {
            return new ArrayList<>();
        }
        return eventRepository
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

        if (refereeId != null) {
            addReferee(lobby, refereeId);
        }
        return eventRepository.save(lobby).getId();
    }

    public Long update(Long lobbyId, LobbyEditDto dto, OAuth2User principal) {
        Event lobby = fetchLobby(lobbyId);
        boolean isHost = userService.isHost(lobby.getStage().getTournamentId(), principal);

        if (lobby.isConcluded() || dto.isConcluded()
                && dto.getMatchId() == null && !getParticipants(lobby, "player").isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (isHost) {
            lobby.getParticipants().removeIf(p -> p.getRole().getName().equals("referee"));
            if (dto.getReferee() != null) {
                addReferee(lobby, getId(dto.getReferee(), false));
            }
        }
        // TODO create map scores when concluding (will check for valid matchId)

        if (isHost) {
            lobby.setTime(dto.getTime());
        }
        lobby.setMatchId(dto.getMatchId());
        lobby.setConcluded(dto.isConcluded());
        return eventRepository.save(lobby).getId();
    }

    public Long registerParticipant(Long lobbyId, LobbyRegisterDto dto, OAuth2User principal) {
        Long participantId = getId(dto.getParticipant(), dto.isTeam());
        Event lobby = fetchLobby(lobbyId);
        Stage stage = lobby.getStage();

        // TODO check if participant is same as logged in user or captain of the team

        // TODO check if player has already registered in another lobby

        if (!userService.hasAnyRole(stage.getTournamentId(), principal, "player", "referee")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        boolean full = getParticipants(lobby, "player").size() == stage.getLobbySize();

        if (full || dto.isReferee() && !getParticipants(lobby, "referee").isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        addParticipant(lobby, participantId, dto.isReferee() ? "referee" : "player", dto.isTeam());
        return eventRepository.save(lobby).getId();
    }

    public Long unregisterParticipant(Long lobbyId, LobbyRegisterDto dto, OAuth2User principal) {
        Long participantId = getId(dto.getParticipant(), dto.isTeam());
        Event lobby = fetchLobby(lobbyId);
        Stage stage = lobby.getStage();

        if (lobby.isConcluded() || stage.getTournament().isConcluded()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (!userService.hasAnyRole(stage.getTournamentId(), principal, "player", "referee")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        Optional<EventParticipant> participant = lobby
                .getParticipants().stream()
                .filter(p -> (dto.isTeam() ? p.getTeamId() : p.getAppUserId()).equals(participantId))
                .findFirst();

        // TODO check if participant is same as logged in user or captain of the team

        if (participant.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        lobby.getParticipants().remove(participant.get());
        return eventRepository.save(lobby).getId();
    }

    public Long delete(Long lobbyId, OAuth2User principal) {
        Event lobby = fetchLobby(lobbyId);
        Tournament tournament = lobby.getStage().getTournament();

        if (!userService.isHost(tournament.getId(), principal)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        if (lobby.isConcluded() || tournament.isConcluded()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        eventRepository.delete(lobby);
        return lobbyId;
    }

    private Long getId(String participant, boolean team) {
        if (team) {
            return teamRepository
                    .findByName(participant)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND))
                    .getId();
        } else {
            return userRepository
                    .findByName(participant)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND))
                    .getId();
        }
    }

    private void addParticipant(Event lobby, Long participantId, String roleName, boolean team) {
        var participant = new EventParticipant();

        participant.setScore(0);
        participant.setAppUser(team ? null : userRepository.getReferenceById(participantId));
        participant.setTeam(team ? teamRepository.getReferenceById(participantId) : null);
        participant.setRole(roleRepository.findByName(roleName).orElseThrow(IllegalArgumentException::new));
        participant.setEvent(lobby);

        lobby.getParticipants().add(participant);
    }

    private void addReferee(Event lobby, Long participantId) {
        addParticipant(lobby, participantId, "referee", false);
    }

    private List<EventParticipant> getParticipants(Event lobby, String role) {
        return lobby
                .getParticipants().stream()
                .filter(p -> p.getRole().getName().equals(role))
                .toList();
    }

    private Event fetchLobby(Long lobbyId) {
        return eventRepository
                .findById(lobbyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    private Stage fetchStage(Long stageId) {
        return stageRepository
                .findById(stageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
