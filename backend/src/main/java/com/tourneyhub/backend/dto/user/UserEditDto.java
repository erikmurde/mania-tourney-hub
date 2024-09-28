package com.tourneyhub.backend.dto.user;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserEditDto {

    @NotNull
    private String discordUsername;

    @NotNull
    @Min(-11)
    @Max(12)
    private Integer timezone;
}
