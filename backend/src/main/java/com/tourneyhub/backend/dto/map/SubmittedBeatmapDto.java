package com.tourneyhub.backend.dto.map;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SubmittedBeatmapDto {

    @NotNull
    private Long stageId;

    @NotNull
    private Long mapTypeId;

    @NotNull
    @Min(0)
    private Integer beatmapId;

    @NotNull
    @Size(min = 2, max = 2)
    private String mapType;

    @NotNull
    @Min(0)
    @Max(100)
    private Integer index;

    @NotNull
    private String comment;
}
