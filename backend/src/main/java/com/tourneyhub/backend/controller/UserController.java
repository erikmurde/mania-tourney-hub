package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.user.SimpleUserDto;
import com.tourneyhub.backend.dto.user.UserDto;
import com.tourneyhub.backend.dto.user.UserEditDto;
import com.tourneyhub.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/api/users/{tournamentId}")
    public List<SimpleUserDto> getAllSimpleWithRoles(
            @PathVariable Long tournamentId,
            @RequestParam List<String> roles,
            @RequestParam Boolean includeUserRoles)
    {
        return service.getAllUsersWithRoles(tournamentId, roles, includeUserRoles);
    }

    @PutMapping("/api/users/me")
    public void updateMe(@RequestBody @Valid UserEditDto dto, @AuthenticationPrincipal OAuth2User principal) {
        service.updateMe(dto, principal);
    }

    @DeleteMapping("/api/users/{tournamentId}/{role}")
    @PreAuthorize("@userService.hasAnyRole(#tournamentId, principal, 'host', 'admin')")
    public void removeUserRole(
            @PathVariable Long tournamentId, @PathVariable String role, @RequestParam Long userId)
    {
        service.removeUserRole(userId, tournamentId, role);
    }
}
