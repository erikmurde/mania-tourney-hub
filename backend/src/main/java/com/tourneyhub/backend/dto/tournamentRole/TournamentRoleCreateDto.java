package com.tourneyhub.backend.dto.tournamentRole;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class TournamentRoleCreateDto extends TournamentRoleDto {

    private Integer userId;
}
