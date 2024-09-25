package com.tourneyhub.backend.dto.match;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MatchResultDto {

    private Integer matchId;

    @NotNull
    @Min(-1)
    private Integer score1;

    @NotNull
    @Min(-1)
    private Integer score2;
}
