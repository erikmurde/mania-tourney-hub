package com.tourneyhub.backend.dto.tournament;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SimpleTournamentDto {

    private Long id;

    private String name;

    private String description;

    private String banner;

    private Integer keyCount;

    private Integer minTeamSize;

    private Integer maxTeamSize;

    private Integer minPlayerRank;

    private Integer maxPlayerRank;

    private boolean concluded;

    private boolean published;
}
