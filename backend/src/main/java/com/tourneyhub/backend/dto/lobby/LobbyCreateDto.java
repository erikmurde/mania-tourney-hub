package com.tourneyhub.backend.dto.lobby;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class LobbyCreateDto {

    @NotNull
    private Long stageId;

    private String referee;

    @NotNull
    @FutureOrPresent
    private Date time;
}
