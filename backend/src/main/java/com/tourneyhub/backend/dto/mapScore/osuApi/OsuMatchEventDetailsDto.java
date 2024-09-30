package com.tourneyhub.backend.dto.mapScore.osuApi;

import lombok.Data;

import java.util.List;

@Data
public class OsuMatchEventDetailsDto {

    private Integer beatmap_id;

    private List<OsuMatchScoreDto> scores;
}
