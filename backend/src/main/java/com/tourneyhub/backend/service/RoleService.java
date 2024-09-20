package com.tourneyhub.backend.service;

import com.tourneyhub.backend.dto.RoleDto;
import com.tourneyhub.backend.mapper.RoleMapper;
import com.tourneyhub.backend.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    private final RoleRepository repository;

    private final RoleMapper mapper;

    public RoleService(RoleRepository repository, RoleMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<RoleDto> getAll() {
        return repository
                .findAll()
                .stream()
                .map(mapper::mapToDto)
                .toList();
    }
}
