package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.*;
import com.tourneyhub.backend.dto.team.SimpleTeamDto;
import com.tourneyhub.backend.dto.team.TeamCreateDto;
import com.tourneyhub.backend.dto.team.TeamDto;
import com.tourneyhub.backend.helper.Constants;
import com.tourneyhub.backend.mapper.TeamMapper;
import com.tourneyhub.backend.mapper.TournamentPlayerMapper;
import com.tourneyhub.backend.mapper.TournamentRoleMapper;
import com.tourneyhub.backend.repository.RepositoryUow;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
public class TeamService {

    private final RepositoryUow uow;

    private final TournamentRoleMapper tournamentRoleMapper;

    private final TournamentPlayerMapper statsMapper;

    private final TeamMapper teamMapper;

    public TeamService(
            RepositoryUow uow,
            TeamMapper teamMapper,
            TournamentRoleMapper tournamentRoleMapper,
            TournamentPlayerMapper statsMapper)
    {
        this.uow = uow;
        this.tournamentRoleMapper = tournamentRoleMapper;
        this.statsMapper = statsMapper;
        this.teamMapper = teamMapper;
    }

    public List<TeamDto> getAll(Long tournamentId, boolean isHost) {
        Tournament tournament = uow.tournamentRepository
                .findById(tournamentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return !tournament.isPlayersPublished() && !isHost
                ? new ArrayList<>()
                : uow.teamRepository
                .findAllInTournament(tournamentId).stream()
                .map(team -> teamMapper.mapToDto(team, uow.userRepository.findTeamPlayers(team.getId())))
                .toList();
    }

    public List<SimpleTeamDto> getAllSimple(Long tournamentId) {
        return uow.teamRepository
                .findAllInTournament(tournamentId).stream()
                .map(t -> teamMapper.mapToSimpleDto(t, false))
                .toList();
    }

    public List<SimpleTeamDto> getAllSimpleWithNames(Long tournamentId, List<String> names) {
        return uow.teamRepository
                .findAllInTournamentWithNames(tournamentId, names).stream()
                .map(t -> teamMapper.mapToSimpleDto(t, true))
                .toList();
    }

    public void create(TeamCreateDto dto, Long currentUserId) {
        Tournament tournament = uow.tournamentRepository
                .findById(dto.getTournamentId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        validateTeamRegistration(dto, tournament, currentUserId);

        Team team = teamMapper.mapToEntity(dto);
        uow.teamRepository.save(team);

        createUserRoles(dto, tournament, team, currentUserId);
    }

    private void createUserRoles(TeamCreateDto dto, Tournament tournament, Team team, Long currentUserId) {
        Role role = uow.roleRepository
                .findByName(Constants.PLAYER)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Status status = uow.statusRepository
                .findByName(Constants.REGISTERED)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        for (Long playerId : dto.getPlayers()) {
            AppUser user = uow.userRepository
                    .findById(playerId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

            boolean teamCaptain = user.getId().equals(currentUserId);
            uow.tournamentRoleRepository.save(tournamentRoleMapper.mapToEntity(role, tournament, user));
            uow.statsRepository.save(statsMapper.mapToEntity(user, tournament, status, team, teamCaptain));
        }
    }

    private void validateTeamRegistration(TeamCreateDto dto, Tournament tournament, Long currentUserId) {
        List<Long> players = dto.getPlayers();

        if (uow.teamRepository.findByName(dto.getName()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (!players.contains(currentUserId) || Set.of(players).size() != players.size()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (players.stream().anyMatch(id -> hasInvalidRole(tournament.getId(), id))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (!tournament.isRegsOpen() || new Date().after(tournament.getRegDeadline())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    private boolean hasInvalidRole(Long tournamentId, Long userId) {
        return uow.tournamentRoleRepository
                .getUserRolesInTournament(tournamentId, userId).stream()
                .anyMatch(r -> !r.isCanRegWithRole());
    }
}
