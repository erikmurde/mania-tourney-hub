package com.tourneyhub.backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

@Entity
public class TournamentRole extends BaseEntity {

    @NotNull
    private boolean canRegWithRole;

    @ManyToOne
    @JoinColumn
    private Role role;

    @ManyToOne
    @JoinColumn
    private Tournament tournament;

    @ManyToOne
    @JoinColumn
    private AppUser appUser;
}
