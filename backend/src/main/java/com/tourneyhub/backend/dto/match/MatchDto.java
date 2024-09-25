package com.tourneyhub.backend.dto.match;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class  MatchDto {

    private Long id;

    private Long stageId;

    private Integer matchId;

    private String code;

    private boolean concluded;

    private Date time;

    private Integer score1;

    private Integer score2;

    private MatchPlayerDto player1;

    private MatchPlayerDto player2;

    private String referee;

    private String streamer;

    private List<String> commentators;
}
