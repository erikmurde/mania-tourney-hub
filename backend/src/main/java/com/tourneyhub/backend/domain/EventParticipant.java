package com.tourneyhub.backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Min;

@Entity
public class EventParticipant extends BaseEntity {

    @Min(0)
    private int score;

    @ManyToOne
    @JoinColumn
    private AppUser appUser;

    @ManyToOne
    @JoinColumn
    private Team team;

    @ManyToOne
    @JoinColumn
    private Role role;

    @ManyToOne
    @JoinColumn
    private Event event;
}
