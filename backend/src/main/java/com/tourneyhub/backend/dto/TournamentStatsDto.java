package com.tourneyhub.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TournamentStatsDto {

    @NotNull
    private Long tournamentId;

    private String team;

    @NotNull
    private String status;

    @NotNull
    @Min(0)
    private Integer seed;

    @NotNull
    @Min(0)
    private Integer placement;

    @NotNull
    private boolean teamCaptain;
}
