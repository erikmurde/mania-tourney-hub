package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.AppUser;
import com.tourneyhub.backend.domain.Tournament;
import com.tourneyhub.backend.mapper.TournamentPlayerMapper;
import com.tourneyhub.backend.repository.TournamentPlayerRepository;
import org.springframework.stereotype.Service;

@Service
public class TournamentPlayerService {

    private final StatusService statusService;

    private final TournamentPlayerRepository repository;

    private final TournamentPlayerMapper mapper;

    public TournamentPlayerService(
            StatusService statusService, TournamentPlayerRepository repository, TournamentPlayerMapper mapper)
    {
        this.statusService = statusService;
        this.repository = repository;
        this.mapper = mapper;
    }

    public void createWithoutTeam(AppUser user, Tournament tournament, String status) {
        repository.save(
                mapper.mapToEntityWithoutTeam(user, tournament, statusService.getEntityByName(status))
        );
    }
}
