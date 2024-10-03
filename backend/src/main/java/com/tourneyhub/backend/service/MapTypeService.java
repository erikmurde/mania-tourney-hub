package com.tourneyhub.backend.service;

import com.tourneyhub.backend.dto.BeatmapTypeDto;
import com.tourneyhub.backend.mapper.BeatmapTypeMapper;
import com.tourneyhub.backend.repository.BeatmapTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MapTypeService {

    private final BeatmapTypeRepository repository;

    private final BeatmapTypeMapper mapper;

    public MapTypeService(BeatmapTypeRepository repository, BeatmapTypeMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<BeatmapTypeDto> getAll() {
        return repository
                .findAll().stream()
                .map(mapper::mapToDto)
                .toList();
    }
}
