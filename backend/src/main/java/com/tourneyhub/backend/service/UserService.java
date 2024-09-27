package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.AppUser;
import com.tourneyhub.backend.domain.TournamentRole;
import com.tourneyhub.backend.dto.user.SimpleUserDto;
import com.tourneyhub.backend.dto.user.UserDto;
import com.tourneyhub.backend.helper.Constants;
import com.tourneyhub.backend.mapper.UserMapper;
import com.tourneyhub.backend.repository.TournamentRoleRepository;
import com.tourneyhub.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final TournamentRoleRepository tournamentRoleRepository;

    private final UserMapper mapper;

    public UserService(
            UserRepository userRepository, TournamentRoleRepository tournamentRoleRepository, UserMapper mapper)
    {
        this.userRepository = userRepository;
        this.tournamentRoleRepository = tournamentRoleRepository;
        this.mapper = mapper;
    }

    public UserDto getMe(OAuth2User principal) {
        if (principal == null) {
            return null;
        }
        AppUser user = userRepository
                .findByPlayerId(principal.getAttribute("id"))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return mapper.mapToDto(user);
    }

    public AppUser getAppUser(OAuth2User principal) {
        return userRepository
                .findByPlayerId(principal.getAttribute("id"))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public List<UserDto> getAll() {
        return userRepository
                .findAll()
                .stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public List<SimpleUserDto> getAllSimple() {
        return userRepository
                .findAll()
                .stream()
                .map(mapper::mapToSimpleDto)
                .toList();
    }

    public List<UserDto> getAllStaff(Long tournamentId) {
        return userRepository
                .findAllStaffInTournament(tournamentId)
                .stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public List<UserDto> getAllPlayers(Long tournamentId) {
        return userRepository
                .findAllPlayersInTournament(tournamentId)
                .stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public List<SimpleUserDto> getAllUsersWithRoles(
            Long tournamentId, List<String> roles, Boolean includeUserRoles)
    {
        return userRepository
                .findAllUsersInTournamentWithRoles(tournamentId, roles)
                .stream()
                .map(user ->
                        includeUserRoles
                        ? mapper.mapToSimpleDto(user, tournamentId)
                        : mapper.mapToSimpleDto(user)
                )
                .toList();
    }

    public void removeUserRole(Long userId, Long tournamentId, String role) {
        if (List.of("host", "player").contains(role)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        TournamentRole tournamentRole = tournamentRoleRepository
                .findRoleToRemove(userId, tournamentId, role)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        tournamentRoleRepository.delete(tournamentRole);
    }

    public boolean isOwner(Integer playerId, OAuth2User principal) {
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
        return tournamentRoleRepository
                .getUserRolesInTournament(principal.getAttribute("id"), tournamentId)
                .stream()
                .map(role -> role.getRole().getName())
                .toList();
    }
}
