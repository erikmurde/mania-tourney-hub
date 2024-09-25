package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.match.MatchCreateDto;
import com.tourneyhub.backend.dto.match.MatchDto;
import com.tourneyhub.backend.dto.match.MatchEditDto;
import com.tourneyhub.backend.dto.match.MatchResultDto;
import com.tourneyhub.backend.service.EventService;
import com.tourneyhub.backend.service.MatchService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MatchController {

    private final EventService eventService;

    private final MatchService matchService;

    public MatchController(EventService eventService, MatchService matchService) {
        this.eventService = eventService;
        this.matchService = matchService;
    }

    @GetMapping("/api/matches/{stageId}")
    public List<MatchDto> getAllByStageId(@PathVariable Long stageId) {
        return matchService.getAllByStageId(stageId);
    }

    @PostMapping("/api/matches")
    public Long create(@RequestBody @Valid MatchCreateDto dto, @AuthenticationPrincipal OAuth2User principal) {
        return matchService.create(dto, principal);
    }

    @PutMapping("/api/matches/{id}")
    public Long update(
            @PathVariable Long id,
            @RequestBody @Valid MatchEditDto dto,
            @AuthenticationPrincipal OAuth2User principal)
    {
        return matchService.update(id, dto, principal);
    }

    @PutMapping("/api/matches/{id}/register")
    public Long registerStaff(
            @PathVariable Long id,
            @RequestParam @NotNull Long userId,
            @RequestParam @NotNull String role,
            @AuthenticationPrincipal OAuth2User principal)
    {
        return matchService.registerStaff(id, userId, role, principal);
    }

    @PutMapping("/api/matches/{id}/unregister")
    public Long unregisterStaff(
            @PathVariable Long id,
            @RequestParam @NotNull Long userId,
            @RequestParam @NotNull String role,
            @AuthenticationPrincipal OAuth2User principal)
    {
        return matchService.unregisterStaff(id, userId, role, principal);
    }

    @PutMapping("/api/matches/{id}/conclude")
    public Long conclude(
            @PathVariable Long id, @RequestBody MatchResultDto dto, @AuthenticationPrincipal OAuth2User principal)
    {
        return matchService.conclude(id, dto, principal);
    }

    @DeleteMapping("/api/matches/{id}")
    public Long delete(@PathVariable Long id, @AuthenticationPrincipal OAuth2User principal) {
        return eventService.delete(id, principal);
    }
}
