package com.tourneyhub.backend.dto.score;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class ScoreDto {

    private Long id;

    private String title;

    private String type;

    private Integer index;

    private List<PlayerScoreDto> playerScores = new ArrayList<>();

    private List<TeamScoreDto> teamScores = new ArrayList<>();
}
