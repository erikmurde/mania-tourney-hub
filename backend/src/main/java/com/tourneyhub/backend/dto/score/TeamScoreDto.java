package com.tourneyhub.backend.dto.score;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class TeamScoreDto {

    private String name;

    private String logo;

    private List<PlayerScoreDto> playerScores;
}
