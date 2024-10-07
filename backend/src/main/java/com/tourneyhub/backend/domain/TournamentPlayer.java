package com.tourneyhub.backend.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
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

    @Column(name = "team_id", insertable = false, updatable = false)
    private Long teamId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Tournament tournament;
}
