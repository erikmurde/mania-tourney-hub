package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.AppUser;
import com.tourneyhub.backend.domain.Tournament;
import com.tourneyhub.backend.domain.TournamentRole;
import com.tourneyhub.backend.domain.exception.AppException;
import com.tourneyhub.backend.dto.user.SimpleUserDto;
import com.tourneyhub.backend.dto.user.UserDto;
import com.tourneyhub.backend.dto.user.UserEditDto;
import com.tourneyhub.backend.helper.Constants;
import com.tourneyhub.backend.mapper.UserMapper;
import com.tourneyhub.backend.repository.RepositoryUow;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
public class UserService {

    private final RepositoryUow uow;

    private final UserMapper mapper;

    public UserService(RepositoryUow uow, UserMapper mapper) {
        this.uow = uow;
        this.mapper = mapper;
    }

    public UserDto getMe(OAuth2User principal) {
        if (principal == null) {
            return null;
        }
        return mapper.mapToDto(getUser(principal));
    }

    public List<UserDto> getAll() {
        return uow.userRepository
                .findAll().stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public List<SimpleUserDto> getAllSimple() {
        return uow.userRepository
                .findAll().stream()
                .map(mapper::mapToSimpleDto)
                .toList();
    }

    public List<UserDto> getTournamentStaff(Long tournamentId) {
        return uow.userRepository
                .findAllStaffInTournament(tournamentId).stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public List<UserDto> getTournamentPlayers(Long tournamentId, OAuth2User principal) {
        Tournament tournament = uow.tournamentRepository
                .findById(tournamentId)
                .orElseThrow(() -> new AppException(
                        String.format("No tournament with id %d!", tournamentId), HttpStatus.NOT_FOUND));

        if (!tournament.isPlayersPublished() &&
                !hasAnyRole(tournamentId, principal, Constants.HOST, Constants.ADMIN)) {
            return new ArrayList<>();
        }
        return uow.userRepository
                .findAllPlayersInTournament(tournamentId).stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public List<SimpleUserDto> getAllUsersWithRoles(
            Long tournamentId, List<String> roles, Boolean includeUserRoles)
    {
        return uow.userRepository
                .findUsersInTournamentWithRoles(tournamentId, roles).stream()
                .map(user ->
                        includeUserRoles
                        ? mapper.mapToSimpleDto(user, tournamentId)
                        : mapper.mapToSimpleDto(user)
                )
                .toList();
    }

    public void updateMe(UserEditDto dto, OAuth2User principal) {
        AppUser user = getUser(principal);

        user.setDiscordUsername(dto.getDiscordUsername());
        user.setTimezone(dto.getTimezone());
        uow.userRepository.save(user);
    }

    public void removeUserRole(Long userId, Long tournamentId, String role) {
        if (List.of("host", "player").contains(role)) {
            throw new AppException(String.format("Invalid role: %s!", role), HttpStatus.BAD_REQUEST);
        }
        TournamentRole tournamentRole = uow.tournamentRoleRepository
                .findRoleToRemove(userId, tournamentId, role)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        uow.tournamentRoleRepository.delete(tournamentRole);
    }

    public boolean isOwner(Long playerId, OAuth2User principal) {
        return playerId.equals(principal.getAttribute("id"));
    }

    public boolean isHost(Long tournamentId, OAuth2User principal) {
        return getTournamentRoles(tournamentId, principal).contains(Constants.HOST);
    }

    public boolean hasAnyRole(Long tournamentId, OAuth2User principal, String... roles) {
        List<String> userRoles = getTournamentRoles(tournamentId, principal);

        return !Collections.disjoint(userRoles, List.of(roles));
    }

    private List<String> getTournamentRoles(Long tournamentId, OAuth2User principal) {
        if (principal == null) {
            return new ArrayList<>();
        }
        Long userId = principal.getAttribute("id");

        return uow.tournamentRoleRepository
                .getUserRolesInTournament(userId, tournamentId).stream()
                .map(role -> role.getRole().getName())
                .toList();
    }

    private AppUser getUser(OAuth2User principal) {
        Long id = principal.getAttribute("id");

        return uow.userRepository
                .findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new AppException(
                        String.format("No user with id %d!", id), HttpStatus.NOT_FOUND));
    }
}
