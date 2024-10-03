package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.*;
import com.tourneyhub.backend.dto.score.ScoreDto;
import com.tourneyhub.backend.dto.score.PlayerScoreDto;
import com.tourneyhub.backend.dto.score.TeamScoreDto;
import com.tourneyhub.backend.repository.RepositoryUow;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class ScoreMapper {

    private final RepositoryUow uow;

    private final UserMapper userMapper;

    public ScoreMapper(RepositoryUow uow, UserMapper userMapper) {
        this.uow = uow;
        this.userMapper = userMapper;
    }

    public ScoreDto mapToDto(Beatmap beatmap, List<Team> teams) {
        var dto = new ScoreDto();

        dto.setId(beatmap.getId());
        dto.setTitle(beatmap.getTitle());
        dto.setType(beatmap.getBeatmapType().getName());
        dto.setIndex(beatmap.getIndex());

        return teams.isEmpty()
                ? mapWithoutTeams(beatmap, dto)
                : mapWithTeams(beatmap, dto, teams);
    }

    public PlayerScoreDto mapToPlayerScoreDto(Score score) {
        return new PlayerScoreDto(
                userMapper.mapToSimpleDto(score.getAppUser()),
                score.getScore(),
                score.getAccuracy(),
                score.getRun()
        );
    }

    public Score mapToEntity(int score, double accuracy, int run, AppUser user, Beatmap beatmap, Event event) {
        double acc = Math.round(accuracy * 10000) / 100D;
        return new Score(score, acc, run, user.getId(), user, beatmap, event);
    }

    private ScoreDto mapWithTeams(Beatmap beatmap, ScoreDto dto, List<Team> teams) {
        List<Event> events = uow.eventRepository.getAllByStageId(beatmap.getStage().getId());

        for (Team team : teams) {
            List<Score> playerScores = uow.scoreRepository
                    .getTeamPlayerScoresOnMap(getPlayerIds(team), beatmap.getId()).stream()
                    .toList();

            for (Event event : events) {
                addTeamScores(team, event, playerScores, dto);
            }
        }
        return dto;
    }

    private ScoreDto mapWithoutTeams(Beatmap beatmap, ScoreDto dto) {
        dto.setPlayerScores(
                beatmap.getScores().stream().map(this::mapToPlayerScoreDto).toList()
        );
        return dto;
    }

    private void addTeamScores(Team team, Event event, List<Score> playerScores, ScoreDto dto) {
        for (List<Score> scores : getEventScoresByRun(playerScores, event.getId()).values()) {
            var teamScore = new TeamScoreDto();
            teamScore.setName(team.getName());
            teamScore.setLogo(team.getLogo());

            if (!scores.isEmpty()) {
                teamScore.setPlayerScores(scores.stream().map(this::mapToPlayerScoreDto).toList());
                dto.getTeamScores().add(teamScore);
            }
        }
    }

    private Map<Integer, List<Score>> getEventScoresByRun(List<Score> scores, Long eventId) {
        return scores.stream()
                .filter(s -> s.getEvent() == null || s.getEvent().getId().equals(eventId))
                .collect(Collectors.groupingBy(Score::getRun));
    }

    private List<Long> getPlayerIds(Team team) {
        return team
                .getPlayers().stream()
                .map(TournamentPlayer::getAppUserId)
                .toList();
    }
}
