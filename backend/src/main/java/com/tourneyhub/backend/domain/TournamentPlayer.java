package com.tourneyhub.backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Entity
public class TournamentPlayer extends BaseEntity {

    @Min(0)
    private int seed;

    @Min(0)
    private int placement;

    @NotNull
    private boolean isTeamCaptain;

    @ManyToOne
    @JoinColumn
    private Status status;

    @ManyToOne
    @JoinColumn
    private AppUser appUser;

    @ManyToOne
    @JoinColumn
    private Team team;

    @ManyToOne
    @JoinColumn
    private Tournament tournament;
}
