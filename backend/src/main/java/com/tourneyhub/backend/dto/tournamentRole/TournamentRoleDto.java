package com.tourneyhub.backend.dto.tournamentRole;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TournamentRoleDto {

    private Long tournamentId;

    private String name;

    private boolean canRegWithRole;
}
