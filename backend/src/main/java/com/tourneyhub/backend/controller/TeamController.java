package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.team.SimpleTeamDto;
import com.tourneyhub.backend.dto.team.TeamDto;
import com.tourneyhub.backend.service.TeamService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TeamController {

    private final TeamService service;

    public TeamController(TeamService service) {
        this.service = service;
    }

    @GetMapping("/api/teams/{tournamentId}")
    public List<TeamDto> getAllByTournamentId(@PathVariable Long tournamentId) {
        return service.getAllByTournamentId(tournamentId);
    }

    @GetMapping("/api/teams/{tournamentId}/simple")
    public List<SimpleTeamDto> getAllSimpleByTournamentId(@PathVariable Long tournamentId) {
        return service.getAllSimpleByTournamentId(tournamentId);
    }
}
