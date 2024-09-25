package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.team.SimpleTeamDto;
import com.tourneyhub.backend.dto.team.TeamDto;
import com.tourneyhub.backend.service.TeamService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TeamController {

    private final TeamService service;

    public TeamController(TeamService service) {
        this.service = service;
    }

    @GetMapping("/api/teams/{tournamentId}")
    public List<TeamDto> getAll(@PathVariable Long tournamentId) {
        return service.getAll(tournamentId);
    }

    @GetMapping("/api/teams/{tournamentId}/simple")
    public List<SimpleTeamDto> getAllSimple(@PathVariable Long tournamentId, @RequestParam List<String> names) {
        return names != null
                ? service.getAllSimpleWithNames(tournamentId, names)
                : service.getAllSimple(tournamentId);
    }
}
