package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.AppUser;
import com.tourneyhub.backend.domain.Team;
import com.tourneyhub.backend.domain.TournamentPlayer;
import com.tourneyhub.backend.dto.TournamentStatsDto;
import com.tourneyhub.backend.dto.team.SimpleTeamDto;
import com.tourneyhub.backend.dto.team.TeamCreateDto;
import com.tourneyhub.backend.dto.team.TeamDto;
import com.tourneyhub.backend.dto.user.UserDto;
import com.tourneyhub.backend.repository.RepositoryUow;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TeamMapper {

    private final RepositoryUow uow;

    private final TournamentPlayerMapper statsMapper;

    private final UserMapper userMapper;

    public TeamMapper(RepositoryUow uow, TournamentPlayerMapper statsMapper, UserMapper userMapper) {
        this.uow = uow;
        this.statsMapper = statsMapper;
        this.userMapper = userMapper;
    }

    public TeamDto mapToDto(Team team, List<AppUser> players) {
        List<TournamentPlayer> stats = uow.statsRepository.getTeamPlayerStats(team.getId());
        TournamentStatsDto teamStats = statsMapper.mapToDto(stats.get(0));

        List<UserDto> mappedPlayers = players.stream()
                .map(p -> userMapper.mapToDto(p, getUserStats(p.getId(), stats)))
                .toList();

        return new TeamDto(
                team.getId(),
                team.getName(),
                team.getLogo(),
                team.getAvailability(),
                teamStats.getStatus(),
                teamStats.getSeed(),
                teamStats.getPlacement(),
                mappedPlayers
        );
    }

    public SimpleTeamDto mapToSimpleDto(Team team, boolean includePlayers) {
        return new SimpleTeamDto(
                team.getId(),
                team.getName(),
                team.getLogo(),
                includePlayers
                        ? team.getPlayers().stream().map(statsMapper::mapToSimpleTeamPlayerDto).toList()
                        : new ArrayList<>()
        );
    }

    public Team mapToEntity(TeamCreateDto dto) {
        var team = new Team();

        team.setName(dto.getName());
        team.setLogo(dto.getLogo());
        team.setAvailability(dto.getAvailability());

        return team;
    }

    private List<TournamentPlayer> getUserStats(Long playerId, List<TournamentPlayer> stats) {
        return stats.stream()
                .filter(s -> s.getAppUserId().equals(playerId))
                .toList();
    }
}
