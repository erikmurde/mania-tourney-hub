package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.Stage;
import com.tourneyhub.backend.domain.Team;
import com.tourneyhub.backend.dto.mapScore.MapScoreDto;
import com.tourneyhub.backend.mapper.MapScoreMapper;
import com.tourneyhub.backend.repository.MapRepository;
import com.tourneyhub.backend.repository.StageRepository;
import com.tourneyhub.backend.repository.TeamRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class MapScoreService {

    private final StageRepository stageRepository;

    private final TeamRepository teamRepository;

    private final MapRepository mapRepository;

    private final MapScoreMapper mapper;

    public MapScoreService(
            StageRepository stageRepository,
            TeamRepository teamRepository,
            MapRepository mapRepository,
            MapScoreMapper mapper)
    {
        this.stageRepository = stageRepository;
        this.teamRepository = teamRepository;
        this.mapRepository = mapRepository;
        this.mapper = mapper;
    }

    public List<MapScoreDto> getAll(Long stageId) {
        Stage stage = stageRepository
                .findById(stageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return stage.getTournament().getMinTeamSize() > 1
                ? getTeamScores(stageId, stage.getTournamentId())
                : getPlayerScores(stageId);
    }

    private List<MapScoreDto> getTeamScores(Long stageId, Long tournamentId) {
        List<Team> teams = teamRepository.findAllInTournament(tournamentId);

        return mapRepository
                .findAllByStageId(stageId).stream()
                .map(m -> mapper.mapToDto(m, teams))
                .toList();
    }

    private List<MapScoreDto> getPlayerScores(Long stageId) {
        return mapRepository
                .findAllByStageIdWithScores(stageId).stream()
                .map(m -> mapper.mapToDto(m, new ArrayList<>()))
                .toList();
    }
}
