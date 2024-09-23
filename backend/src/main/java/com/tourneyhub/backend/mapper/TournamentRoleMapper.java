package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.Tournament;
import com.tourneyhub.backend.domain.TournamentRole;
import com.tourneyhub.backend.dto.tournamentRole.TournamentRoleDto;
import org.springframework.stereotype.Component;

@Component
public class TournamentRoleMapper {

    public TournamentRoleDto mapToDto(TournamentRole role) {
        Tournament tournament = role.getTournament();

        return new TournamentRoleDto(
                tournament.getId(),
                tournament.getName(),
                role.getRole().getName(),
                role.isCanRegWithRole(),
                tournament.isConcluded()
        );
    }
}
