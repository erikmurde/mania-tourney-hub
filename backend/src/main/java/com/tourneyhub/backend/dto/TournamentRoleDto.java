package com.tourneyhub.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TournamentRoleDto {

    private Long tournamentId;

    private String name;

    private boolean canRegWithRole;
}
