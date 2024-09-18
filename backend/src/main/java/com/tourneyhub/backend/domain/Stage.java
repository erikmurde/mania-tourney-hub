package com.tourneyhub.backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.Date;
import java.util.List;

@Entity
public class Stage extends BaseEntityWithName {

    @Min(3)
    private int bestOf;

    @Min(1)
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

    @ManyToOne
    @JoinColumn
    private Tournament tournament;

    @ManyToOne
    @JoinColumn
    private StageType stageType;

    @OneToMany(mappedBy = "stage")
    private List<Map> maps;

    @OneToMany(mappedBy = "stage")
    private List<Event> events;
}
