package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.AppUser;
import com.tourneyhub.backend.domain.Role;
import com.tourneyhub.backend.domain.Tournament;
import com.tourneyhub.backend.domain.TournamentRole;
import com.tourneyhub.backend.dto.tournamentRole.TournamentRoleDto;
import com.tourneyhub.backend.helper.Constants;
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

    public TournamentRole mapToEntity(Role role, Tournament tournament, AppUser user) {
        return new TournamentRole(
                Constants.ROLE_CAN_REG.get(role.getName()),
                tournament.getId(),
                tournament,
                user,
                role
        );
    }
}
