package com.tourneyhub.backend.dto.lobby;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class LobbyEditDto {

    private String referee;

    @Min(1)
    private Integer matchId;

    @NotNull
    private Date time;

    @NotNull
    private boolean concluded;
}
