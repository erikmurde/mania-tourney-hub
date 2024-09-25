package com.tourneyhub.backend.dto.match;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class MatchCreateDto {

    @NotNull
    private Long stageId;

    @NotNull
    private boolean teams;

    @NotNull
    @Size(min = 1, max = 8)
    private String code;

    @NotNull
    @FutureOrPresent
    private Date time;

    @NotNull
    private Long player1Id;

    @NotNull
    private Long player2Id;

    private Long refereeId;

    private Long streamerId;

    @NotNull
    private List<Long> commentatorIds;
}
