package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.*;
import com.tourneyhub.backend.domain.Map;
import com.tourneyhub.backend.dto.mapScore.MapScoreDto;
import com.tourneyhub.backend.dto.mapScore.osuApi.OsuMatchDto;
import com.tourneyhub.backend.dto.mapScore.osuApi.OsuMatchEventDetailsDto;
import com.tourneyhub.backend.dto.mapScore.osuApi.OsuMatchEventDto;
import com.tourneyhub.backend.dto.mapScore.osuApi.OsuMatchScoreDto;
import com.tourneyhub.backend.mapper.MapScoreMapper;
import com.tourneyhub.backend.repository.RepositoryUow;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
public class MapScoreService {

    private final WebClient webClient;

    private final RepositoryUow uow;

    private final UserService userService;

    private final MapScoreMapper mapper;

    public MapScoreService(WebClient webClient, RepositoryUow uow, UserService userService, MapScoreMapper mapper) {
        this.webClient = webClient;
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

    public void createScores(Long stageId, Integer matchId) {
        List<OsuMatchEventDto> events = fetchMatchFromOsu(matchId)
                .getEvents().stream()
                .filter(e -> e.getGame() != null)
                .toList();

        List<Map> maps = uow.mapRepository.findAllInMappoolByStageId(stageId);
        List<MapScore> scores = new ArrayList<>();
        Set<AppUser> users = new HashSet<>();

        for (OsuMatchEventDto event : events) {
            createScoresForMap(event.getGame(), maps, scores, users);
        }
        uow.mapScoreRepository.saveAll(scores);
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

    private void createScoresForMap(
            OsuMatchEventDetailsDto event, List<Map> maps, List<MapScore> scores, Set<AppUser> users)
    {
        Optional<Map> map = maps.stream()
                .filter(m -> m.getBeatmapId().equals(event.getBeatmap_id()))
                .findFirst();

        if (map.isEmpty()) {
            return;
        }
        for (OsuMatchScoreDto score : event.getScores()) {
            AppUser user = getUser(users, score.getUser_id());

            users.add(user);
            scores.add(mapper.mapToEntity(score.getScore(), score.getAccuracy(), user, map.get()));
        }
    }

    private AppUser getUser(Set<AppUser> users, Integer playerId) {
        Optional<AppUser> existing = users.stream()
                .filter(u -> u.getPlayerId().equals(playerId))
                .findFirst();

        return existing.orElseGet(() -> uow.userRepository
                .findByPlayerId(playerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
    }

    private OsuMatchDto fetchMatchFromOsu(@PathVariable("matchId") Integer matchId) {
        try {
            return webClient
                    .get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/matches/{matchId}")
                            .build(matchId)
                    )
                    .retrieve()
                    .bodyToMono(OsuMatchDto.class)
                    .block();

        } catch (WebClientResponseException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
