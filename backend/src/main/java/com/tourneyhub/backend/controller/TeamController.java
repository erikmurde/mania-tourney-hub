package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.team.SimpleTeamDto;
import com.tourneyhub.backend.dto.team.TeamCreateDto;
import com.tourneyhub.backend.dto.team.TeamDto;
import com.tourneyhub.backend.service.TeamService;
import com.tourneyhub.backend.service.UserService;
import jakarta.annotation.Nullable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TeamController {

    private final UserService userService;

    private final TeamService teamService;

    public TeamController(UserService userService, TeamService teamService) {
        this.userService = userService;
        this.teamService = teamService;
    }

    @GetMapping("/api/teams/{tournamentId}")
    public List<TeamDto> getAll(@PathVariable Long tournamentId, @AuthenticationPrincipal OAuth2User principal) {
        boolean isHost = userService.isHost(tournamentId, principal);

        return teamService.getAll(tournamentId, isHost);
    }

    @GetMapping("/api/teams/{tournamentId}/simple")
    public List<SimpleTeamDto> getAllSimple(@PathVariable Long tournamentId, @RequestParam @Nullable List<String> names) {
        return names != null
                ? teamService.getAllSimpleWithNames(tournamentId, names)
                : teamService.getAllSimple(tournamentId);
    }

    @PostMapping("/api/teams")
    public void create(@RequestBody TeamCreateDto dto, @AuthenticationPrincipal OAuth2User principal) {
        teamService.create(dto, principal.getAttribute("id"));
    }
}
