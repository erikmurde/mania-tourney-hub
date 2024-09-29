package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.Stage;
import com.tourneyhub.backend.domain.Team;
import com.tourneyhub.backend.domain.Tournament;
import com.tourneyhub.backend.dto.mapScore.MapScoreDto;
import com.tourneyhub.backend.mapper.MapScoreMapper;
import com.tourneyhub.backend.repository.RepositoryUow;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class MapScoreService {

    private final RepositoryUow uow;

    private final UserService userService;

    private final MapScoreMapper mapper;

    public MapScoreService(RepositoryUow uow, UserService userService, MapScoreMapper mapper) {
        this.uow = uow;
        this.userService = userService;
        this.mapper = mapper;
    }

    public List<MapScoreDto> getAll(Long stageId, OAuth2User principal) {
        Stage stage = uow.stageRepository
                .findById(stageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Tournament tournament = stage.getTournament();

        if (!userService.isHost(tournament.getId(), principal)
                && (!tournament.isPublished() || !stage.isStatsPublished())) {
            return new ArrayList<>();
        }
        return tournament.getMinTeamSize() > 1
                ? getTeamScores(stageId, stage.getTournamentId())
                : getPlayerScores(stageId);
    }

    private List<MapScoreDto> getTeamScores(Long stageId, Long tournamentId) {
        List<Team> teams = uow.teamRepository.findAllInTournament(tournamentId);

        return uow.mapRepository
                .findAllByStageId(stageId).stream()
                .map(m -> mapper.mapToDto(m, teams))
                .toList();
    }

    private List<MapScoreDto> getPlayerScores(Long stageId) {
        return uow.mapRepository
                .findAllByStageIdWithScores(stageId).stream()
                .map(m -> mapper.mapToDto(m, new ArrayList<>()))
                .toList();
    }
}
