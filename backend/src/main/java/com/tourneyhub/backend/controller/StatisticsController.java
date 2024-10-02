package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.mapScore.MapScoreDto;
import com.tourneyhub.backend.service.MapScoreService;
import com.tourneyhub.backend.service.SeedingService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StatisticsController {

    private final MapScoreService mapScoreService;

    private final SeedingService seedingService;

    public StatisticsController(MapScoreService mapScoreService, SeedingService seedingService) {
        this.mapScoreService = mapScoreService;
        this.seedingService = seedingService;
    }

    @GetMapping("/api/statistics/{stageId}")
    public List<MapScoreDto> getAllInStage(
            @PathVariable Long stageId, @AuthenticationPrincipal OAuth2User principal)
    {
        return mapScoreService.getAll(stageId, principal);
    }

    @PutMapping("/api/statistics/{stageId}/seed")
    public void seedParticipants(@PathVariable Long stageId, @AuthenticationPrincipal OAuth2User principal) {
        seedingService.recalculateSeeding(stageId, principal);
    }
}
