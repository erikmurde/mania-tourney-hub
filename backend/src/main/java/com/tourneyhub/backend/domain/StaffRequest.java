package com.tourneyhub.backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Size;

@Entity
public class StaffRequest extends BaseEntity {

    @Size(min = 1)
    private String description;

    @ManyToOne
    @JoinColumn
    private AppUser sender;

    @ManyToOne
    @JoinColumn
    private AppUser recipient;

    @ManyToOne
    @JoinColumn
    private Role role;

    @ManyToOne
    @JoinColumn
    private Status status;

    @ManyToOne
    @JoinColumn
    private Tournament tournament;
}
