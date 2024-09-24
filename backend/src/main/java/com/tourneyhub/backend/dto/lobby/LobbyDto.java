package com.tourneyhub.backend.dto.lobby;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class LobbyDto {

    private Long id;

    private Long stageId;

    private Integer matchId;

    private String code;

    private Date time;

    private boolean concluded;

    private List<String> players;

    private String referee;
}
