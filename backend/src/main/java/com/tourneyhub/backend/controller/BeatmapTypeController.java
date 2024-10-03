package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.BeatmapTypeDto;
import com.tourneyhub.backend.service.MapTypeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BeatmapTypeController {

    private final MapTypeService service;

    public BeatmapTypeController(MapTypeService service) {
        this.service = service;
    }

    @GetMapping("/api/mapTypes")
    public List<BeatmapTypeDto> getAll() {
        return service.getAll();
    }
}
