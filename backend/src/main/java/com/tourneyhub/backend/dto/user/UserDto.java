package com.tourneyhub.backend.dto.user;

import com.tourneyhub.backend.dto.CountryDto;
import com.tourneyhub.backend.dto.TournamentStatsDto;
import com.tourneyhub.backend.dto.tournamentRole.TournamentRoleDto;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import static com.tourneyhub.backend.helper.Constants.URL_REGEX;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    @NotNull
    private Long id;

    @NotNull
    @Min(0)
    private Integer playerId;

    @NotNull
    private String name;

    @NotNull
    @Min(0)
    private Integer rank;

    @NotNull
    private String discordUsername;

    @NotNull
    @Min(-11)
    @Max(12)
    private Integer timezone;

    @NotNull
    @Pattern(regexp = URL_REGEX)
    private String avatar;

    @NotNull
    private CountryDto country;

    @NotNull
    private List<TournamentRoleDto> roles;

    @NotNull
    private List<TournamentStatsDto> stats;
}
