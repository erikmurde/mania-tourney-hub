package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.*;
import com.tourneyhub.backend.dto.TournamentStatsDto;
import com.tourneyhub.backend.dto.team.SimpleTeamPlayerDto;
import org.springframework.stereotype.Component;

@Component
public class TournamentPlayerMapper {

    public TournamentStatsDto mapToDto(TournamentPlayer stats) {
        Team team = stats.getTeam();

        return new TournamentStatsDto(
                stats.getTournament().getId(),
                team != null ? team.getName() : null,
                stats.getStatus().getName(),
                stats.getSeed(),
                stats.getPlacement(),
                stats.isTeamCaptain()
        );
    }

    public SimpleTeamPlayerDto mapToSimpleTeamPlayerDto(TournamentPlayer stats) {
        return new SimpleTeamPlayerDto(
                stats.getAppUser().getName(),
                stats.isTeamCaptain()
        );
    }

    public TournamentPlayer mapToEntity(AppUser user, Tournament tournament, Status status) {
        return mapToEntity(user, tournament, status, null, false);
    }

    public TournamentPlayer mapToEntity(
            AppUser user, Tournament tournament, Status status, Team team, boolean teamCaptain)
    {
        return new TournamentPlayer(
                0, 0, teamCaptain, status, user.getId(), user, team, tournament
        );
    }
}
