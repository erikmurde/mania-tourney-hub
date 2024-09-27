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

    public TournamentPlayer mapToEntityWithoutTeam(AppUser user, Tournament tournament, Status status) {
        return new TournamentPlayer(
                0, 0, false, status, user.getId(), user, null, tournament
        );
    }
}
