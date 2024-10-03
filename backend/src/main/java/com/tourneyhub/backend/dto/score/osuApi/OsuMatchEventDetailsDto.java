package com.tourneyhub.backend.dto.score.osuApi;

import lombok.Data;

import java.util.List;

@Data
public class OsuMatchEventDetailsDto {

    private Integer beatmap_id;

    private List<OsuMatchScoreDto> scores;
}
