package com.tourneyhub.backend.service;

import com.tourneyhub.backend.dto.team.SimpleTeamDto;
import com.tourneyhub.backend.dto.team.TeamDto;
import com.tourneyhub.backend.mapper.TeamMapper;
import com.tourneyhub.backend.repository.TeamRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {

    private final TeamRepository repository;

    private final TeamMapper mapper;

    public TeamService(TeamRepository repository, TeamMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<TeamDto> getAllByTournamentId(Long tournamentId) {
        return repository
                .findAllTeamsInTournament(tournamentId)
                .stream()
                .map(team -> mapper.mapToDto(team, tournamentId))
                .toList();
    }

    public List<SimpleTeamDto> getAllSimpleByTournamentId(Long tournamentId) {
        return repository
                .findAllTeamsInTournament(tournamentId)
                .stream()
                .map(mapper::mapToSimpleDto)
                .toList();
    }
}
