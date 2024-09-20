package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.StatusDto;
import com.tourneyhub.backend.service.StatusService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StatusController {

    private final StatusService service;

    public StatusController(StatusService service) {
        this.service = service;
    }

    @GetMapping("/api/statuses")
    public List<StatusDto> getAll() {
        return service.getAll();
    }

    @GetMapping("/api/statuses/name/{name}")
    public StatusDto getByName(@PathVariable String name) {
        return service.getByName(name);
    }
}
