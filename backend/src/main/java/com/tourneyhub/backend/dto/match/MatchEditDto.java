package com.tourneyhub.backend.dto.match;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class MatchEditDto {

    @NotNull
    @Size(min = 1, max = 8)
    private String code;

    @NotNull
    @FutureOrPresent
    private Date time;

    private Long refereeId;

    private Long streamerId;

    @NotNull
    private List<Long> commentatorIds;
}
