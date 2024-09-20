package com.tourneyhub.backend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StageTypeDto {

    @NotNull
    private Long id;

    @NotNull
    @Size(min = 1)
    private String name;
}
