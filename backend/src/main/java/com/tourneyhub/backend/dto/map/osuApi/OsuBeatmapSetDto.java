package com.tourneyhub.backend.dto.map.osuApi;

import lombok.Data;

@Data
public class OsuBeatmapSetDto {

    private String title;

    private String artist;

    private String creator;

    private String preview_url;

    private OsuBeatmapCoverDto covers;
}
