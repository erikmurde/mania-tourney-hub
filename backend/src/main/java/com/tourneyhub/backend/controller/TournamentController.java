package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.tournament.SimpleTournamentDto;
import com.tourneyhub.backend.dto.tournament.TournamentCreateDto;
import com.tourneyhub.backend.dto.tournament.TournamentDto;
import com.tourneyhub.backend.dto.tournament.TournamentPublishDto;
import com.tourneyhub.backend.service.TournamentService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
        return service.create(dto, principal);
    }

    @PutMapping("/api/tournaments/{tournamentId}")
    @PreAuthorize("@userService.isHost(#tournamentId, principal)")
    public Long update(
            @PathVariable Long tournamentId,
            @RequestBody @Valid TournamentCreateDto dto,
            @AuthenticationPrincipal OAuth2User principal)
    {
        return service.update(tournamentId, dto, principal);
    }

    @PutMapping("/api/tournaments/{tournamentId}/information")
    @PreAuthorize("@userService.isHost(#tournamentId, principal)")
    public Long updateInformation(
            @PathVariable Long tournamentId, @RequestBody @NotNull @Size(max = 1000000) String information)
    {
        return service.updateInformation(tournamentId, information);
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

    @PutMapping("/api/tournaments/{tournamentId}/register")
    public void registerPlayer(@PathVariable Long tournamentId, @AuthenticationPrincipal OAuth2User principal) {
        service.registerPlayer(tournamentId, principal);
    }
}
