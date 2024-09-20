package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.stage.StageDto;
import com.tourneyhub.backend.service.StageService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StageController {

    private final StageService service;

    public StageController(StageService service) {
        this.service = service;
    }

    @GetMapping("/api/stages/tournament/{tournamentId}")
    public List<StageDto> getByTournamentId(@PathVariable Long tournamentId) {
        return service.getByTournamentId(tournamentId);
    }

    @PostMapping("/api/stages")
    @PreAuthorize("@userService.isHost(#stage.tournamentId, principal)")
    public void create(@RequestBody StageDto stage) {
        service.create(stage);
    }

    @PutMapping("/api/stages/{stageId}")
    @PreAuthorize("@userService.isHost(#stage.tournamentId, principal)")
    public void update(@PathVariable Long stageId, @RequestBody StageDto stage) {
        service.update(stageId, stage);
    }

    @DeleteMapping("/api/stages/{stageId}")
    public void delete(@PathVariable Long stageId, @AuthenticationPrincipal OAuth2User principal) {
        service.delete(stageId, principal);
    }
}
