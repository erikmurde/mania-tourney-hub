package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.Team;
import com.tourneyhub.backend.dto.TournamentStatsDto;
import com.tourneyhub.backend.dto.team.SimpleTeamDto;
import com.tourneyhub.backend.dto.team.TeamDto;
import com.tourneyhub.backend.dto.user.UserDto;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TeamMapper {

    private final TournamentPlayerMapper tournamentPlayerMapper;

    private final UserMapper userMapper;

    public TeamMapper(TournamentPlayerMapper tournamentPlayerMapper, UserMapper userMapper) {
        this.tournamentPlayerMapper = tournamentPlayerMapper;
        this.userMapper = userMapper;
    }

    public TeamDto mapToDto(Team team, Long tournamentId) {
        List<UserDto> players = team
                .getPlayers()
                .stream()
                .map(player -> userMapper.mapToDto(player.getAppUser()))
                .toList();

        TournamentStatsDto stats = getStats(players.get(0), team.getName(), tournamentId);

        return new TeamDto(
                team.getId(),
                team.getName(),
                team.getLogo(),
                team.getAvailability(),
                stats.getStatus(),
                stats.getSeed(),
                stats.getPlacement(),
                players
        );
    }

    public SimpleTeamDto mapToSimpleDto(Team team) {
        return new SimpleTeamDto(
                team.getName(),
                team.getLogo(),
                team.getPlayers().stream().map(tournamentPlayerMapper::mapToSimpleTeamPlayerDto).toList()
        );
    }

    private TournamentStatsDto getStats(UserDto player, String name, Long tournamentId) {
        return player
                .getStats()
                .stream()
                .filter(stat -> stat.getTournamentId().equals(tournamentId) && stat.getTeam().equals(name))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
