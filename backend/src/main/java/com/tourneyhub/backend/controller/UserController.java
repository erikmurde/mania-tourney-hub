package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.user.SimpleUserDto;
import com.tourneyhub.backend.dto.user.UserDto;
import com.tourneyhub.backend.service.TournamentService;
import com.tourneyhub.backend.service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {

    private final TournamentService tournamentService;

    private final UserService userService;

    public UserController(TournamentService tournamentService, UserService userService) {
        this.tournamentService = tournamentService;
        this.userService = userService;
    }

    @GetMapping("/api/users/me")
    public UserDto getMe(@AuthenticationPrincipal OAuth2User principal) {
        return userService.getMe(principal);
    }

    @GetMapping("/api/users")
    public List<UserDto> getAll() {
        return userService.getAll();
    }

    @GetMapping("/api/users/simple")
    public List<SimpleUserDto> getAllSimple() {
        return userService.getAllSimple();
    }

    @GetMapping("/api/users/{tournamentId}/staff")
    public List<UserDto> getAllStaff(@PathVariable Long tournamentId) {
        return userService.getAllStaff(tournamentId);
    }

    @GetMapping("/api/users/{tournamentId}/players")
    public List<UserDto> getAllPlayers(
            @PathVariable Long tournamentId, @AuthenticationPrincipal OAuth2User principal)
    {
        if (!tournamentService.getTournament(tournamentId).isPlayersPublished()
                && !userService.hasAnyRole(tournamentId, principal, "host", "admin")) {
            return new ArrayList<>();
        }
        return userService.getAllPlayers(tournamentId);
    }

    @GetMapping("/api/users/{tournamentId}")
    public List<SimpleUserDto> getSimpleUsersWithRoles(
            @PathVariable Long tournamentId, @RequestParam List<String> roles, @RequestParam Boolean includeUserRoles)
    {
        return userService.getAllUsersWithRoles(tournamentId, roles, includeUserRoles);
    }

    @DeleteMapping("/api/users/{tournamentId}/{role}")
    @PreAuthorize("@userService.hasAnyRole(#tournamentId, principal, 'host', 'admin')")
    public void removeUserRole(
            @PathVariable Long tournamentId, @PathVariable String role, @RequestParam Long userId)
    {
        userService.removeUserRole(userId, tournamentId, role);
    }
}
