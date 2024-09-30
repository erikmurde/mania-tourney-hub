package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.*;
import com.tourneyhub.backend.dto.mapScore.MapScoreDto;
import com.tourneyhub.backend.dto.mapScore.PlayerScoreDto;
import com.tourneyhub.backend.dto.mapScore.TeamScoreDto;
import com.tourneyhub.backend.repository.MapScoreRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MapScoreMapper {

    private final MapScoreRepository mapScoreRepository;

    private final UserMapper userMapper;

    public MapScoreMapper(MapScoreRepository mapScoreRepository, UserMapper userMapper) {
        this.mapScoreRepository = mapScoreRepository;
        this.userMapper = userMapper;
    }

    public MapScoreDto mapToDto(Map map, List<Team> teams) {
        var dto = new MapScoreDto();

        dto.setId(map.getId());
        dto.setTitle(map.getTitle());
        dto.setType(map.getMapType().getName());
        dto.setIndex(map.getIndex());

        return teams.isEmpty()
                ? mapWithoutTeams(map, dto)
                : mapWithTeams(map, dto, teams);
    }

    public PlayerScoreDto mapToPlayerScoreDto(MapScore score) {
        return new PlayerScoreDto(
                userMapper.mapToSimpleDto(score.getAppUser()),
                score.getScore(),
                score.getAccuracy()
        );
    }

    public MapScore mapToEntity(Integer score, Double accuracy, AppUser user, Map map) {
        return new MapScore(score, Math.round(accuracy * 10000) / 100D, user.getId(), user, map);
    }

    private MapScoreDto mapWithTeams(Map map, MapScoreDto dto, List<Team> teams) {
        for (Team team : teams) {
            var teamScore = new TeamScoreDto();
            teamScore.setName(team.getName());
            teamScore.setLogo(team.getLogo());

            List<Long> playerIds = team
                    .getPlayers().stream()
                    .map(TournamentPlayer::getAppUserId)
                    .toList();

            List<PlayerScoreDto> playerScores = mapScoreRepository
                    .getTeamPlayerScoresOnMap(playerIds, map.getId()).stream()
                    .map(this::mapToPlayerScoreDto)
                    .toList();

            if (!playerScores.isEmpty()) {
                teamScore.setPlayerScores(playerScores);
                dto.getTeamScores().add(teamScore);
            }
        }
        return dto;
    }

    private MapScoreDto mapWithoutTeams(Map map, MapScoreDto dto) {
        dto.setPlayerScores(
                map.getScores().stream().map(this::mapToPlayerScoreDto).toList()
        );
        return dto;
    }
}
