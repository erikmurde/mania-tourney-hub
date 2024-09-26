package com.tourneyhub.backend.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
public class TournamentPlayer extends BaseEntity {

    @Min(0)
    private int seed;

    @Min(0)
    private int placement;

    @NotNull
    private boolean teamCaptain;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Status status;

    @Column(name = "app_user_id", insertable = false, updatable = false)
    private Long appUserId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private AppUser appUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Tournament tournament;
}
