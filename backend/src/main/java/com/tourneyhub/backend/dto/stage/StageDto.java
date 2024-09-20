package com.tourneyhub.backend.dto.stage;

import com.tourneyhub.backend.dto.StageTypeDto;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class StageDto {

    @NotNull
    private Long id;

    @NotNull
    private Long tournamentId;

    @NotNull
    @Size(min = 1)
    private String name;

    @NotNull
    @Min(0)
    private Integer bestOf;

    @NotNull
    @Min(0)
    private Integer lobbySize;

    @NotNull
    @Min(0)
    private Integer numAdvancing;

    @NotNull
    @Future
    private Date schedulingDeadline;

    @NotNull
    private StageTypeDto stageType;

    @NotNull
    private boolean mappoolPublished;

    @NotNull
    private boolean schedulePublished;

    @NotNull
    private boolean statsPublished;
}
