package com.tourneyhub.backend.dto.lobby;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LobbyRegisterDto {

    @NotNull
    private String participant;

    @NotNull
    private boolean referee;

    @NotNull
    private boolean team;
}
