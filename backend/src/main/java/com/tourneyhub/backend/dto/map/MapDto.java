package com.tourneyhub.backend.dto.map;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import static com.tourneyhub.backend.helper.Constants.URL_REGEX;

@Data
@AllArgsConstructor
public class MapDto {

    @NotNull
    private Long id;

    @NotNull
    private Long stageId;

    @NotNull
    private Long mapTypeId;

    @NotNull
    @Min(0)
    private Integer beatmapId;

    @NotNull
    @Size(min = 1, max = 128)
    private String title;

    @NotNull
    @Size(min = 1, max = 64)
    private String diff;

    @NotNull
    @Size(min = 1, max = 64)
    private String artist;

    @NotNull
    @Size(min = 1, max = 64)
    private String mapper;

    @NotNull
    @Size(min = 1, max = 64)
    private String suggestor;

    @NotNull
    @Pattern(regexp = URL_REGEX)
    private String cover;

    @NotNull
    @Pattern(regexp = URL_REGEX)
    private String download;

    @NotNull
    @Min(0)
    @Max(100)
    private Double sr;

    @NotNull
    @Min(0)
    @Max(10000)
    private Double bpm;

    @NotNull
    @Min(0)
    @Max(10)
    private Double hp;

    @NotNull
    @Min(0)
    @Max(10)
    private Double od;

    @NotNull
    @Min(0)
    @Max(7200)
    private int drainTime;

    @NotNull
    private boolean inMappool;

    @NotNull
    @Size(min = 2, max = 2)
    private String mapType;

    @NotNull
    @Min(0)
    @Max(100)
    private int index;

    @NotNull
    private String comment;

    private String songPreview;
}
