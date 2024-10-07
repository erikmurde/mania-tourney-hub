package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.*;
import com.tourneyhub.backend.domain.exception.AppException;
import com.tourneyhub.backend.dto.tournament.SimpleTournamentDto;
import com.tourneyhub.backend.dto.tournament.TournamentCreateDto;
import com.tourneyhub.backend.dto.tournament.TournamentDto;
import com.tourneyhub.backend.dto.tournament.TournamentPublishDto;
import com.tourneyhub.backend.mapper.TournamentMapper;
import com.tourneyhub.backend.mapper.TournamentPlayerMapper;
import com.tourneyhub.backend.mapper.TournamentRoleMapper;
import com.tourneyhub.backend.repository.RepositoryUow;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

import static com.tourneyhub.backend.helper.Constants.*;

@Service
public class TournamentService {

    private final RepositoryUow uow;

    private final TournamentRoleMapper tournamentRoleMapper;

    private final TournamentPlayerMapper statsMapper;

    private final TournamentMapper tournamentMapper;

    public TournamentService(
            RepositoryUow uow,
            TournamentRoleMapper tournamentRoleMapper,
            TournamentPlayerMapper statsMapper,
            TournamentMapper tournamentMapper)
    {
        this.uow = uow;
        this.tournamentRoleMapper = tournamentRoleMapper;
        this.statsMapper = statsMapper;
        this.tournamentMapper = tournamentMapper;
    }

    public List<SimpleTournamentDto> getAll() {
        return uow.tournamentRepository
                .findAll()
                .stream()
                .map(tournamentMapper::mapToSimpleDto).toList();
    }

    public TournamentDto getById(Long tournamentId) {
        return tournamentMapper.mapToDto(getTournament(tournamentId));
    }

    public Long create(TournamentCreateDto dto, Long currentUserId) {
        dto.setRegsOpen(false);
        dto.setApplicationsOpen(false);
        validateTournament(dto);

        Tournament tournament = tournamentMapper.mapCreateToEntity(dto);
        uow.tournamentRepository.save(tournament);

        updateHostRoles(dto.getHostRoles(), tournament, currentUserId);
        return tournament.getId();
    }

    public Long update(Long tournamentId, TournamentCreateDto dto, Long currentUserId) {
        validateTournament(dto);
        Tournament tournament = getTournament(tournamentId);

        tournamentMapper.mapUpdateToEntity(tournament, dto);
        uow.tournamentRepository.save(tournament);

        updateHostRoles(dto.getHostRoles(), tournament, currentUserId);
        return tournamentId;
    }

    public void conclude(Long tournamentId) {
        Tournament tournament = getTournament(tournamentId);

        tournament.setConcluded(true);
        tournament.setRegsOpen(false);
        tournament.setApplicationsOpen(false);

        uow.tournamentRepository.save(tournament);
        uow.staffRequestRepository
                .deleteAll(uow.staffRequestRepository.getAllPendingRequestsInTournament(tournamentId));
    }

    public Long publish(Long tournamentId, TournamentPublishDto dto) {
        Tournament tournament = getTournament(tournamentId);

        if (dto.isRegsOpen() && dto.getRegDeadline() == null
                || dto.isApplicationsOpen() && dto.getApplicationDeadline() == null) {
            throw new AppException("Tournament has missing deadlines!", HttpStatus.BAD_REQUEST);
        }
        tournament.setRegsOpen(dto.isRegsOpen());
        tournament.setApplicationsOpen(dto.isApplicationsOpen());
        tournament.setRegDeadline(dto.getRegDeadline());
        tournament.setApplicationDeadline(dto.getApplicationDeadline());
        tournament.setPublished(true);

        return uow.tournamentRepository.save(tournament).getId();
    }

    public Long makePrivate(Long tournamentId) {
        Tournament tournament = getTournament(tournamentId);

        if (!tournament.getPlayers().isEmpty()) {
            throw new AppException("Tournament has registered players!", HttpStatus.BAD_REQUEST);
        }
        tournament.setRegsOpen(false);
        tournament.setApplicationsOpen(false);
        tournament.setPublished(false);

        return uow.tournamentRepository.save(tournament).getId();
    }

    public void publishPlayers(Long tournamentId) {
        Tournament tournament = getTournament(tournamentId);
        Status status = getStatus(ACTIVE);

        tournament.getPlayers().forEach(player -> {
            if (player.getStatus().getName().equals(REGISTERED)) {
                player.setStatus(status);
            }
        });
        tournament.setPlayersPublished(true);
        uow.tournamentRepository.save(tournament);
    }

    public void registerPlayer(Long tournamentId, Long currentUserId) {
        Tournament tournament = getTournament(tournamentId);
        AppUser user = getLoggedInUser(currentUserId);

        if (!tournament.isRegsOpen() || new Date().after(tournament.getRegDeadline())) {
            throw new AppException("Registrations are not open!", HttpStatus.BAD_REQUEST);
        }
        uow.tournamentRoleRepository.save(tournamentRoleMapper.mapToEntity(getRole(PLAYER), tournament, user));
        uow.statsRepository.save(statsMapper.mapToEntity(user, tournament, getStatus(REGISTERED)));
    }

    public void eliminateTeam(Long tournamentId, Long teamId) {
        Team team = uow.teamRepository
                .findById(teamId)
                .orElseThrow(() -> new AppException(
                        String.format("No team with ID %d.", teamId), HttpStatus.NOT_FOUND));

        Tournament tournament = getTournament(tournamentId);
        Integer placement = uow.statsRepository.getNumOfActiveTeams(tournamentId);
        team.getPlayers().forEach(player -> updatePlayerStats(tournament, player.getAppUserId(), placement));
    }

    public void eliminatePlayer(Long tournamentId, Long playerId) {
        Tournament tournament = getTournament(tournamentId);
        updatePlayerStats(tournament, playerId, uow.statsRepository.getNumOfActivePlayers(tournamentId));
    }

    private void updatePlayerStats(Tournament tournament, Long playerId, Integer placement) {
        TournamentPlayer stats = uow.statsRepository
                .getPlayerStatsInTournament(tournament.getId(), playerId)
                .orElseThrow(() -> new AppException(
                        String.format("No stats for player with ID %d.", playerId), HttpStatus.NOT_FOUND));

        if (tournament.isPlayersPublished() && stats.getPlacement() == 0) {
            stats.setPlacement(placement);
        }
        stats.setStatus(getStatus(tournament.isPlayersPublished() ? ELIMINATED : DISQUALIFIED));
        uow.statsRepository.save(stats);
    }

    private void validateTournament(TournamentCreateDto dto) {
        String error = null;
        List<String> roles = dto.getHostRoles();

        if (dto.isRegsOpen() && dto.getRegDeadline() == null
                || dto.isApplicationsOpen() && dto.getApplicationDeadline() == null) {
            error = "Tournament is missing deadlines!";
        }
        if (!roles.contains(HOST) || roles.contains(PLAYER)) {
            error = "Tournament host roles are invalid!";
        }
        if (dto.getMaxPlayerRank() < dto.getMinPlayerRank() || dto.getMaxTeamSize() < dto.getMinTeamSize()) {
            error = "Tournament has invalid restrictions!";
        }
        if (error != null) {
            throw new AppException(error, HttpStatus.BAD_REQUEST);
        }
    }

    private void updateHostRoles(List<String> roles, Tournament tournament, Long currentUserId) {
        AppUser user = getLoggedInUser(currentUserId);

        for (TournamentRole role : user.getRoles()) {
            if (role.getTournamentId().equals(tournament.getId())) {
                uow.tournamentRoleRepository.delete(role);
            }
        }
        for (String roleName : roles) {
            uow.tournamentRoleRepository.save(tournamentRoleMapper.mapToEntity(getRole(roleName), tournament, user));
        }
    }

    private Tournament getTournament(Long tournamentId) {
        return uow.tournamentRepository
                .findById(tournamentId)
                .orElseThrow(() -> new AppException(
                        String.format("No tournament with ID %d.", tournamentId), HttpStatus.NOT_FOUND));
    }

    private AppUser getLoggedInUser(Long currentUserId) {
        return uow.userRepository
                .findById(currentUserId)
                .orElseThrow(() -> new AppException(
                        String.format("No user with ID %d.", currentUserId), HttpStatus.NOT_FOUND));
    }

    private Status getStatus(String name) {
        return uow.statusRepository
                .findByName(name)
                .orElseThrow(() -> new AppException(
                        String.format("No status with name: %s.", name), HttpStatus.NOT_FOUND));
    }

    private Role getRole(String name) {
        return uow.roleRepository
                .findByName(name)
                .orElseThrow(() -> new AppException(
                        String.format("No role with name: %s.", name), HttpStatus.NOT_FOUND));
    }
}
