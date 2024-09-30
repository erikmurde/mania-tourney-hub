package com.tourneyhub.backend.dto.staffInvite;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class StaffInviteEditDto {

    @NotNull
    @Min(1)
    public Long recipientId;

    @NotNull
    @Size(min = 1, max = 16)
    private String status;
}
