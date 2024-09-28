package com.tourneyhub.backend.dto.team;

import com.tourneyhub.backend.helper.Constants;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.util.List;

@Data
public class TeamCreateDto {

    @NotNull
    private Long tournamentId;

    @NotNull
    private String name;

    @NotNull
    @Pattern(regexp = Constants.URL_REGEX)
    private String logo;

    @NotNull
    private String availability;

    @NotNull
    private List<Long> players;
}
