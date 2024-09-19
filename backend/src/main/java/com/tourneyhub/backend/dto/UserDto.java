package com.tourneyhub.backend.dto;

import com.tourneyhub.backend.dto.tournamentRole.TournamentRoleDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserDto {

    private Integer playerId;

    private String name;

    private Integer rank;

    private String discordUsername;

    private Integer timezone;

    private String avatar;

    private CountryDto country;

    private List<TournamentRoleDto> roles;

    private List<TournamentStatsDto> stats;
}
