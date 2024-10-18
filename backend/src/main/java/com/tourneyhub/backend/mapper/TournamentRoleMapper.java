package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.AppUser;
import com.tourneyhub.backend.domain.Role;
import com.tourneyhub.backend.domain.Tournament;
import com.tourneyhub.backend.domain.TournamentRole;
import com.tourneyhub.backend.dto.tournamentRole.TournamentRoleDto;
import org.springframework.stereotype.Component;

@Component
public class TournamentRoleMapper {

    public TournamentRoleDto mapToDto(TournamentRole tournamentRole) {
        Tournament tournament = tournamentRole.getTournament();
        Role role = tournamentRole.getRole();

        return new TournamentRoleDto(
                tournament.getId(),
                tournament.getName(),
                role.getName(),
                role.getCanRegWithRole(),
                tournament.isConcluded()
        );
    }

    public TournamentRole mapToEntity(Role role, Tournament tournament, AppUser user) {
        return new TournamentRole(tournament.getId(), tournament, user, role);
    }
}
