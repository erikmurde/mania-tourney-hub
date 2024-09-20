package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.StageTypeDto;
import com.tourneyhub.backend.service.StageTypeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StageTypeController {

    private final StageTypeService service;

    public StageTypeController(StageTypeService service) {
        this.service = service;
    }

    @GetMapping("/api/stageTypes/name/{name}")
    public StageTypeDto getByName(@PathVariable String name) {
        return service.getByName(name);
    }
}
