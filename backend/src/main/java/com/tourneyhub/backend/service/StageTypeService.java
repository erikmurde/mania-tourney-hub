package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.exception.AppException;
import com.tourneyhub.backend.dto.StageTypeDto;
import com.tourneyhub.backend.mapper.StageTypeMapper;
import com.tourneyhub.backend.repository.StageTypeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class StageTypeService {

    private final StageTypeRepository repository;

    private final StageTypeMapper mapper;

    public StageTypeService(StageTypeRepository repository, StageTypeMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public StageTypeDto getByName(String name) {
        return repository
                .findByName(name)
                .map(mapper::mapToDto)
                .orElseThrow(() -> new AppException(
                        String.format("No stage type with name %s", name), HttpStatus.NOT_FOUND));
    }
}
