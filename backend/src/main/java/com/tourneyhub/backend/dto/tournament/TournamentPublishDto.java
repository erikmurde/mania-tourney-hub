package com.tourneyhub.backend.dto.tournament;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class TournamentPublishDto {

    @NotNull
    private boolean regsOpen;

    @NotNull
    private boolean applicationsOpen;

    @Future
    private Date regDeadline;

    @Future
    private Date applicationDeadline;
}
