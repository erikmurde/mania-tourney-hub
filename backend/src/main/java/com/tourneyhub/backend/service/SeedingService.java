package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.*;
import com.tourneyhub.backend.domain.exception.AppException;
import com.tourneyhub.backend.dto.score.SeedingDto;
import com.tourneyhub.backend.dto.score.SeedingScoreDto;
import com.tourneyhub.backend.helper.Constants;
import com.tourneyhub.backend.repository.RepositoryUow;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SeedingService {

    private final RepositoryUow uow;

    private final UserService userService;

    public SeedingService(RepositoryUow uow, UserService userService) {
        this.uow = uow;
        this.userService = userService;
    }

    public void recalculateSeeding(Long stageId, OAuth2User principal) {
        Stage stage = getStage(stageId);
        Tournament tournament = stage.getTournament();
        String stageType = stage.getStageType().getName();

        if (!userService.isHost(tournament.getId(), principal)) {
            throw new AppException(Constants.NO_PERMISSION, HttpStatus.FORBIDDEN);
        }
        if (tournament.isConcluded() || !tournament.isPlayersPublished() || !stageType.equals("qualifier")) {
            throw new AppException("Invalid tournament state or stage type!", HttpStatus.BAD_REQUEST);
        }
        List<Beatmap> maps = uow.mapRepository.findAllInMappoolByStageIdWithScores(stageId);
        boolean isTeam = tournament.getMinTeamSize() > 1;

        List<SeedingDto> results = isTeam
                ? recalculateTeamSeeding(tournament.getId(), maps)
                : recalculatePlayerSeeding(tournament.getId(), maps);

        updatePlayerSeeding(results, tournament.getId(), isTeam);
    }

    public void updatePlayerSeeding(List<SeedingDto> results, Long tournamentId, boolean isTeam) {
        List<TournamentPlayer> players = getUsers(tournamentId);
        List<Long> ids = results.stream().map(SeedingDto::getId).toList();

        for (TournamentPlayer player : players) {
            int index = ids.indexOf(isTeam ? player.getTeam().getId() : player.getAppUserId());

            player.setSeed(results.get(index).getRankSum() == null ? 0 : index + 1);
            uow.statsRepository.save(player);
        }
    }

    public List<SeedingDto> recalculatePlayerSeeding(Long tournamentId, List<Beatmap> maps) {
        List<TournamentPlayer> players = getUsers(tournamentId);

        Map<Long, Integer> rankSums = new HashMap<>();
        Map<Long, List<Integer>> allScores = new HashMap<>();

        for (Beatmap map : maps) {
            updateScores(getPlayerScores(map.getScores()), rankSums, allScores);
        }
        return players.stream()
                .map(p -> mapToDto(p.getAppUserId(), maps.size(), rankSums, allScores))
                .sorted(this::compare)
                .toList();
    }

    public List<SeedingDto> recalculateTeamSeeding(Long tournamentId, List<Beatmap> maps) {
        List<Team> teams = getTeams(tournamentId);

        Map<Long, Integer> rankSums = new HashMap<>();
        Map<Long, List<Integer>> allScores = new HashMap<>();

        for (Beatmap map : maps) {
            updateScores(getTeamScores(map.getScores(), teams), rankSums, allScores);
        }
        return teams.stream()
                .map(team -> mapToDto(team.getId(), maps.size(), rankSums, allScores))
                .sorted(this::compare)
                .toList();
    }

    private List<SeedingScoreDto> getPlayerScores(List<Score> scores) {
        List<SeedingScoreDto> seedingScores = new ArrayList<>();
        List<Long> seenUsers = new ArrayList<>();

        scores.sort(Comparator.comparingInt(Score::getScore).reversed());

        for (Score score : scores) {
            Long userId = score.getAppUserId();

            if (!seenUsers.contains(userId)) {
                seedingScores.add(new SeedingScoreDto(userId, score.getScore()));
                seenUsers.add(userId);
            }
        }
        return seedingScores;
    }

    private List<SeedingScoreDto> getTeamScores(List<Score> scores, List<Team> teams) {
        List<SeedingScoreDto> seedingScores = new ArrayList<>();

        for (Team team : teams) {
            Long teamId = team.getId();

            List<Score> playerScores = scores.stream().filter(s -> getTeamId(s, teams).equals(teamId)).toList();
            Integer teamScore = getBestTeamScore(playerScores);

            if (teamScore != null) {
                seedingScores.add(new SeedingScoreDto(teamId, teamScore));
            }
        }
        return seedingScores;
    }

    private void updateScores(
            List<SeedingScoreDto> seedingScores, Map<Long, Integer> rankSums, Map<Long, List<Integer>> allScores)
    {
        seedingScores.sort(Comparator.comparingInt(SeedingScoreDto::getScore).reversed());
        int index = 1;

        for (var seedingScore : seedingScores) {
            long id = seedingScore.getId();

            rankSums.put(id, rankSums.containsKey(id) ? rankSums.get(id) + index++ : index++);
            allScores.computeIfAbsent(id, score -> new ArrayList<>()).add(seedingScore.getScore());
        }
    }

    private Integer getBestTeamScore(List<Score> scores) {
        Map<Integer, Integer> teamScores = new HashMap<>();

        for (Score mapScore : scores) {
            int score = mapScore.getScore();
            int run = mapScore.getRun();

            teamScores.put(run, teamScores.containsKey(run) ? teamScores.get(run) + score : score);
        }
        return !teamScores.isEmpty()
                ? Collections.max(teamScores.entrySet(), Map.Entry.comparingByValue()).getValue()
                : null;
    }

    private Long getTeamId(Score score, List<Team> teams) {
        Optional<Team> team = teams.stream()
                .filter(t -> mapPlayers(t.getPlayers()).contains(score.getAppUserId()))
                .findFirst();

        return team.map(BaseEntity::getId).orElseThrow(IllegalArgumentException::new);
    }

    private SeedingDto mapToDto(
            Long id, Integer numMaps, Map<Long, Integer> rankSums, Map<Long, List<Integer>> allScores)
    {
        List<Integer> scores = allScores.get(id);

        if (scores == null || scores.size() < numMaps) {
            return new SeedingDto(id, null, null);
        }
        int scoreSum = scores.stream().mapToInt(Integer::intValue).sum();
        return new SeedingDto(id, rankSums.get(id), scoreSum / scores.size());
    }

    private List<Long> mapPlayers(List<TournamentPlayer> players) {
        return players.stream().map(TournamentPlayer::getAppUserId).toList();
    }

    private Integer compare(SeedingDto a, SeedingDto b) {
        if (a.getRankSum() == null) {
            return b.getRankSum() == null ? 0 : 1;
        }
        if (b.getRankSum() == null) {
            return -1;
        }
        if (a.getRankSum().equals(b.getRankSum())) {
            return a.getAvgScore() > b.getAvgScore() ? -1 : 1;
        }
        return a.getRankSum() > b.getRankSum() ? 1 : -1;
    }

    private List<TournamentPlayer> getUsers(Long tournamentId) {
        return uow.statsRepository
                .getAllValidTournamentStats(tournamentId).stream()
                .toList();
    }

    private List<Team> getTeams(Long tournamentId) {
        return uow.teamRepository
                .findAllInTournament(tournamentId).stream()
                .toList();
    }

    private Stage getStage(Long id) {
        return uow.stageRepository
                .findById(id)
                .orElseThrow(() -> new AppException(
                        String.format("No stage with ID %d.", id), HttpStatus.NOT_FOUND));
    }
}
