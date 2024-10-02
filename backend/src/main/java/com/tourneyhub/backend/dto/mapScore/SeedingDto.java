package com.tourneyhub.backend.dto.mapScore;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SeedingDto {

    private Long id;

    private Integer rankSum;

    private Integer avgScore;
}
