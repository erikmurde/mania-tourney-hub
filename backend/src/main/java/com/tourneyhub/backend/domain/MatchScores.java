package com.tourneyhub.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MatchScores {

    private Integer beatmapId;

    private List<Score> scores;
}
