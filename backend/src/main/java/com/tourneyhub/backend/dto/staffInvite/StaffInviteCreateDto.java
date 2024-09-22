package com.tourneyhub.backend.dto.staffInvite;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class StaffInviteCreateDto {

    @NotNull
    private Long recipientId;

    @NotNull
    private Long senderId;

    @NotNull
    private Long tournamentId;

    @NotNull
    private Long roleId;

    @NotNull
    @Size(min = 1)
    private String description;
}
