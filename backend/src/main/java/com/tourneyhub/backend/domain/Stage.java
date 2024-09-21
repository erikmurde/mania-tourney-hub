package com.tourneyhub.backend.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
public class Stage extends BaseEntityWithName {

    @Min(0)
    private int bestOf;

    @Min(0)
    private int lobbySize;

    @Min(0)
    private int numAdvancing;

    @NotNull
    private Date schedulingDeadline;

    @NotNull
    private boolean mappoolPublished;

    @NotNull
    private boolean schedulePublished;

    @NotNull
    private boolean statsPublished;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Tournament tournament;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private StageType stageType;

    @OneToMany(mappedBy = "stage")
    private List<Map> maps = new ArrayList<>();

    @OneToMany(mappedBy = "stage")
    private List<Event> events = new ArrayList<>();
}
