package com.tourneyhub.backend.dto.score.osuApi;

import lombok.Data;

@Data
public class OsuMatchScoreDto {

    private Integer user_id;

    private Integer score;

    private Double accuracy;
}
