package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.user.SimpleUserDto;
import com.tourneyhub.backend.dto.user.UserDto;
import com.tourneyhub.backend.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/api/users/me")
    public UserDto getMe(@AuthenticationPrincipal OAuth2User principal) {
        return service.getMe(principal);
    }

    @GetMapping("/api/users")
    public List<UserDto> getAll() {
        return service.getAll();
    }

    @GetMapping("/api/users/simple")
    public List<SimpleUserDto> getAllSimple() {
        return service.getAllSimple();
    }

    @GetMapping("/api/users/{tournamentId}/staff")
    public List<UserDto> getAllStaff(@PathVariable Long tournamentId) {
        return service.getAllStaff(tournamentId);
    }

    @GetMapping("/api/users/{tournamentId}/players")
    public List<UserDto> getAllPlayers(@PathVariable Long tournamentId) {
        return service.getAllPlayers(tournamentId);
    }

    @GetMapping("/api/users/{tournamentId}")
    public List<SimpleUserDto> getSimpleUsersWithRoles(
            @PathVariable Long tournamentId, @RequestParam List<String> roles, @RequestParam Boolean includeUserRoles)
    {
        return service.getAllUsersWithRoles(tournamentId, roles, includeUserRoles);
    }
}
