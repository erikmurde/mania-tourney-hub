package com.tourneyhub.backend.dto.staffApplication;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StaffApplicationEditDto {

    @NotNull
    private Integer senderId;

    @NotNull
    private Long tournamentId;

    @NotNull
    private Long statusId;
}
