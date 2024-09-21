package com.tourneyhub.backend.dto.map;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InMappoolUpdateDto {

    @NotNull
    private Boolean inMappool;
}
