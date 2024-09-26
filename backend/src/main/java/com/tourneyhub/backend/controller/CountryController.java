package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.CountryDto;
import com.tourneyhub.backend.service.CountryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CountryController {

    private final CountryService service;

    public CountryController(CountryService service) {
        this.service = service;
    }

    @GetMapping("/api/countries")
    public List<CountryDto> getAll() {
        return service.getAll();
    }
}
