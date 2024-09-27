package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.AppUser;
import com.tourneyhub.backend.domain.Role;
import com.tourneyhub.backend.domain.Tournament;
import com.tourneyhub.backend.domain.TournamentRole;
import com.tourneyhub.backend.mapper.TournamentRoleMapper;
import com.tourneyhub.backend.repository.TournamentRoleRepository;
import org.springframework.stereotype.Service;

@Service
public class TournamentRoleService {

    private final TournamentRoleRepository repository;

    private final TournamentRoleMapper mapper;

    public TournamentRoleService(TournamentRoleRepository repository, TournamentRoleMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public void create(Role role, Tournament tournament, AppUser user) {
        repository.save(mapper.mapToEntity(role, tournament, user));
    }

    public void delete(TournamentRole role) {
        repository.delete(role);
    }
}
