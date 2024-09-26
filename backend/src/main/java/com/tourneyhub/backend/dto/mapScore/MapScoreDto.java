package com.tourneyhub.backend.dto.mapScore;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class MapScoreDto {

    private Long id;

    private String title;

    private String type;

    private Integer index;

    private List<PlayerScoreDto> playerScores = new ArrayList<>();

    private List<TeamScoreDto> teamScores = new ArrayList<>();
}
