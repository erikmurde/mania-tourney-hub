package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.tournament.SimpleTournamentDto;
import com.tourneyhub.backend.dto.tournament.TournamentCreateDto;
import com.tourneyhub.backend.dto.tournament.TournamentDto;
import com.tourneyhub.backend.dto.tournament.TournamentPublishDto;
import com.tourneyhub.backend.service.TournamentService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TournamentController {

    private final TournamentService service;

    public TournamentController(TournamentService service) {
        this.service = service;
    }

    @GetMapping("/api/tournaments")
    public List<SimpleTournamentDto> getAll() {
        return service.getAll();
    }

    @GetMapping("/api/tournaments/{tournamentId}")
    public TournamentDto getById(@PathVariable Long tournamentId) {
        return service.getById(tournamentId);
    }

    @PostMapping("/api/tournaments")
    public Long create(@RequestBody @Valid TournamentCreateDto dto, @AuthenticationPrincipal OAuth2User principal) {
        return service.create(dto, principal.getAttribute("id"));
    }

    @PostMapping("/api/tournaments/{tournamentId}/register")
    public void registerPlayer(@PathVariable Long tournamentId, @AuthenticationPrincipal OAuth2User principal) {
        service.registerPlayer(tournamentId, principal.getAttribute("id"));
    }

    @PutMapping("/api/tournaments/{tournamentId}")
    @PreAuthorize("@userService.isHost(#tournamentId, principal)")
    public Long update(
            @PathVariable Long tournamentId,
            @RequestBody @Valid TournamentCreateDto dto,
            @AuthenticationPrincipal OAuth2User principal)
    {
        return service.update(tournamentId, dto, principal.getAttribute("id"));
    }

    @PutMapping("/api/tournaments/{tournamentId}/publish")
    @PreAuthorize("@userService.isHost(#tournamentId, principal)")
    public Long publish(@PathVariable Long tournamentId, @RequestBody @Valid TournamentPublishDto dto) {
        return service.publish(tournamentId, dto);
    }

    @PutMapping("/api/tournaments/{tournamentId}/private")
    @PreAuthorize("@userService.isHost(#tournamentId, principal)")
    public Long makePrivate(@PathVariable Long tournamentId) {
        return service.makePrivate(tournamentId);
    }

    @PutMapping("/api/tournaments/{tournamentId}/publish-players")
    @PreAuthorize("@userService.isHost(#tournamentId, principal)")
    public void publishPlayers(@PathVariable Long tournamentId) {
        service.publishPlayers(tournamentId);
    }

    @PutMapping("/api/tournaments/{tournamentId}/eliminate/{participantId}")
    @PreAuthorize("@userService.isHost(#tournamentId, principal)")
    public void eliminateParticipant(
            @PathVariable Long tournamentId, @PathVariable Long participantId, @RequestParam boolean team)
    {
        if (team) {
            service.eliminateTeam(tournamentId, participantId);
        } else {
            service.eliminatePlayer(tournamentId, participantId);
        }
    }
}
