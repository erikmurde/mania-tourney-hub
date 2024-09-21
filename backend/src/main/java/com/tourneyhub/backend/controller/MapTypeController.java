package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.MapTypeDto;
import com.tourneyhub.backend.service.MapTypeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MapTypeController {

    private final MapTypeService service;

    public MapTypeController(MapTypeService service) {
        this.service = service;
    }

    @GetMapping("/api/mapTypes")
    public List<MapTypeDto> getAll() {
        return service.getAll();
    }
}
