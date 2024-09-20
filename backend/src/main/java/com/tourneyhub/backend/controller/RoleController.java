package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.RoleDto;
import com.tourneyhub.backend.service.RoleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RoleController {

    private final RoleService service;

    public RoleController(RoleService service) {
        this.service = service;
    }

    @GetMapping("/api/roles")
    public List<RoleDto> getAll() {
        return service.getAll();
    }
}
