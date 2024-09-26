package com.tourneyhub.backend.service;

import com.tourneyhub.backend.dto.CountryDto;
import com.tourneyhub.backend.mapper.CountryMapper;
import com.tourneyhub.backend.repository.CountryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {

    private final CountryRepository repository;

    private final CountryMapper mapper;

    public CountryService(CountryRepository repository, CountryMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<CountryDto> getAll() {
        return repository
                .findAll().stream()
                .map(mapper::mapToDto)
                .toList();
    }
}
