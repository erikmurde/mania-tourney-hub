package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.*;
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
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;

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
        return uow.tournamentRepository
                .findById(tournamentId)
                .map(tournamentMapper::mapToDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
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

        if (isMissingDeadlines(dto)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
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
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        tournament.setRegsOpen(false);
        tournament.setApplicationsOpen(false);
        tournament.setPublished(false);

        return uow.tournamentRepository.save(tournament).getId();
    }

    public void publishPlayers(Long tournamentId) {
        Tournament tournament = getTournament(tournamentId);
        Status status = getStatus("active");

        tournament.getPlayers().forEach(player -> {
            if (player.getStatus().getName().equals("registered")) {
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
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        uow.tournamentRoleRepository
                .save(tournamentRoleMapper.mapToEntity(getRole("player"), tournament, user));
        uow.statsRepository
                .save(statsMapper.mapToEntity(user, tournament, getStatus("registered")));
    }

    public void eliminateTeam(Long tournamentId, Long teamId) {
        Team team = uow.teamRepository
                .findById(teamId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (tournament.isPlayersPublished() && stats.getPlacement() == 0) {
            stats.setPlacement(placement);
        }
        stats.setStatus(getStatus(tournament.isPlayersPublished() ? "eliminated" : "disqualified"));
        uow.statsRepository.save(stats);
    }

    private void validateTournament(TournamentCreateDto dto) {
        List<String> roles = dto.getHostRoles();

        if (dto.isRegsOpen() && dto.getRegDeadline() == null
                || dto.isApplicationsOpen() && dto.getApplicationDeadline() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (!roles.contains("host") || roles.contains("player")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (dto.getMaxPlayerRank() < dto.getMinPlayerRank() || dto.getMaxTeamSize() < dto.getMinTeamSize()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
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

    private boolean isMissingDeadlines(TournamentPublishDto dto) {
        return (dto.isRegsOpen() && dto.getRegDeadline() == null
                || dto.isApplicationsOpen() && dto.getApplicationDeadline() == null);
    }

    private Tournament getTournament(Long tournamentId) {
        return uow.tournamentRepository
                .findById(tournamentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    private AppUser getLoggedInUser(Long currentUserId) {
        return uow.userRepository
                .findById(currentUserId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    private Status getStatus(String name) {
        return uow.statusRepository
                .findByName(name)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    private Role getRole(String name) {
        return uow.roleRepository
                .findByName(name)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
