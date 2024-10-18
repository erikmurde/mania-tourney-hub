package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.*;
import com.tourneyhub.backend.domain.exception.AppException;
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
        return !getTournament(tournamentId).isPlayersPublished() && !isHost
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
        Tournament tournament = getTournament(dto.getTournamentId());
        validateTeamRegistration(dto, tournament, currentUserId);

        Team team = teamMapper.mapToEntity(dto);
        uow.teamRepository.save(team);

        createUserRoles(dto, tournament, team, currentUserId);
    }

    private void createUserRoles(TeamCreateDto dto, Tournament tournament, Team team, Long currentUserId) {
        Role role = uow.roleRepository
                .findByName(Constants.PLAYER)
                .orElseThrow(() -> new RuntimeException("Constant role not found!"));
        Status status = uow.statusRepository
                .findByName(Constants.REGISTERED)
                .orElseThrow(() -> new RuntimeException("Constant status not found!"));

        for (Long playerId : dto.getPlayers()) {
            AppUser user = uow.userRepository
                    .findById(playerId)
                    .orElseThrow(() -> new AppException(
                            String.format("No user with ID %d.", playerId), HttpStatus.NOT_FOUND));

            boolean teamCaptain = user.getId().equals(currentUserId);
            uow.tournamentRoleRepository.save(tournamentRoleMapper.mapToEntity(role, tournament, user));
            uow.statsRepository.save(statsMapper.mapToEntity(user, tournament, status, team, teamCaptain));
        }
    }

    private void validateTeamRegistration(TeamCreateDto dto, Tournament tournament, Long currentUserId) {
        String error = null;
        List<Long> players = dto.getPlayers();

        if (uow.teamRepository.findByName(dto.getName()).isPresent()) {
            error = String.format("Team with same name already exists: %s!", dto.getName());
        }
        if (!players.contains(currentUserId) || Set.of(players).size() != players.size()) {
            error = "Players contain duplicates or logged in user not present!";
        }
        if (players.stream().anyMatch(id -> hasInvalidRole(tournament.getId(), id))) {
            error = "Players contain users with invalid roles!";
        }
        if (!tournament.isRegsOpen() || new Date().after(tournament.getRegDeadline())) {
            error = "Registrations are not open!";
        }
        if (error != null) {
            throw new AppException(error, HttpStatus.BAD_REQUEST);
        }
    }

    private boolean hasInvalidRole(Long tournamentId, Long userId) {
        return uow.tournamentRoleRepository
                .getUserRolesInTournament(tournamentId, userId).stream()
                .anyMatch(r -> !r.getRole().getCanRegWithRole());
    }

    private Tournament getTournament(Long id) {
        return uow.tournamentRepository
                .findById(id)
                .orElseThrow(() -> new AppException(
                        String.format("No tournament with ID %d.", id), HttpStatus.NOT_FOUND));
    }
}
