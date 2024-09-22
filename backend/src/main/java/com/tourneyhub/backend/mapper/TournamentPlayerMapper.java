package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.TournamentPlayer;
import com.tourneyhub.backend.dto.TournamentStatsDto;
import org.springframework.stereotype.Component;

@Component
public class TournamentPlayerMapper {

    public TournamentStatsDto mapToDto(TournamentPlayer stats) {
        return new TournamentStatsDto(
                stats.getTournament().getId(),
                stats.getStatus().getName(),
                stats.getSeed(),
                stats.getPlacement(),
                stats.isTeamCaptain()
        );
    }
}
