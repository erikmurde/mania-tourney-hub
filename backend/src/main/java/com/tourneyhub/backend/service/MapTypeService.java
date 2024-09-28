package com.tourneyhub.backend.service;

import com.tourneyhub.backend.dto.MapTypeDto;
import com.tourneyhub.backend.mapper.MapTypeMapper;
import com.tourneyhub.backend.repository.MapTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MapTypeService {

    private final MapTypeRepository repository;

    private final MapTypeMapper mapper;

    public MapTypeService(MapTypeRepository repository, MapTypeMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<MapTypeDto> getAll() {
        return repository
                .findAll().stream()
                .map(mapper::mapToDto)
                .toList();
    }
}
