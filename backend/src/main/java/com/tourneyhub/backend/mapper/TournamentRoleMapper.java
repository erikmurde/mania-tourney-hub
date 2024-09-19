package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.TournamentRole;
import com.tourneyhub.backend.dto.tournamentRole.TournamentRoleDto;
import org.springframework.stereotype.Component;

@Component
public class TournamentRoleMapper {

    public TournamentRoleDto mapToDto(TournamentRole role) {
        return new TournamentRoleDto(
                role.getTournamentId(),
                role.getRole().getName(),
                role.isCanRegWithRole()
        );
    }
}
