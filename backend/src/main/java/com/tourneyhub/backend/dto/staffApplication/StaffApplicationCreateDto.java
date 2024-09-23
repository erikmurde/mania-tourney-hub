package com.tourneyhub.backend.dto.staffApplication;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class StaffApplicationCreateDto {

    @NotNull
    private Integer senderPlayerId;

    @NotNull
    private Long senderId;

    @NotNull
    private Long tournamentId;

    @NotNull
    private Long roleId;

    @NotNull
    private Long statusId;

    @NotNull
    @Size(min = 1)
    private String description;
}
