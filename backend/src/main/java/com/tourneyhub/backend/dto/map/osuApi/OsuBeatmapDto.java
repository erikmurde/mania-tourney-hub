package com.tourneyhub.backend.dto.map.osuApi;

import lombok.Data;

@Data
public class OsuBeatmapDto {

    private Integer id;

    private String version;

    private String url;

    private Double bpm;

    private Integer total_length;

    private Double drain;

    private Double difficulty_rating;

    private Double accuracy;

    private OsuBeatmapSetDto beatmapset;
}
