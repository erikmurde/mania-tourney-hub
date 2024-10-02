package com.tourneyhub.backend.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class MapScore extends BaseEntity {

    @Min(0)
    private int score;

    @Min(0)
    @Max(100)
    private Double accuracy;

    @Min(1)
    private int run;

    @Column(name = "app_user_id", insertable = false, updatable = false)
    private Long appUserId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private AppUser appUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Beatmap map;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Event event;
}
