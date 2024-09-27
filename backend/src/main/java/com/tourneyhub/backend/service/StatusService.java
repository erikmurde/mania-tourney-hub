package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.Status;
import com.tourneyhub.backend.dto.StatusDto;
import com.tourneyhub.backend.mapper.StatusMapper;
import com.tourneyhub.backend.repository.StatusRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class StatusService {

    private final StatusRepository repository;

    private final StatusMapper mapper;

    public StatusService(StatusRepository repository, StatusMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<StatusDto> getAll() {
        return repository
                .findAll()
                .stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public StatusDto getByName(String name) {
        return repository
                .findByName(name)
                .map(mapper::mapToDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Status getEntityById(Long id) {
        return repository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Status getEntityByName(String name) {
        return repository
                .findByName(name)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
