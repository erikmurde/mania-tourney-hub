package com.tourneyhub.backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@Entity
public class MapScore extends BaseEntity {

    @Min(0)
    private int score;

    @Min(0)
    @Max(100)
    private Double accuracy;

    @ManyToOne
    @JoinColumn
    private AppUser appUser;

    @ManyToOne
    @JoinColumn
    private Map map;
}
