package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.mapScore.MapScoreDto;
import com.tourneyhub.backend.service.MapScoreService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MapScoreController {

    private final MapScoreService service;

    public MapScoreController(MapScoreService service) {
        this.service = service;
    }

    @GetMapping("/api/statistics/{stageId}")
    public List<MapScoreDto> getAllInStage(@PathVariable Long stageId) {
        return service.getAll(stageId);
    }
}
