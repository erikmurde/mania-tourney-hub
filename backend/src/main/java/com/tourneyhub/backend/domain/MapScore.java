package com.tourneyhub.backend.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class MapScore extends BaseEntity {

    @Min(0)
    private int score;

    @Min(0)
    @Max(100)
    private Double accuracy;

    @Column(name = "app_user_id", insertable = false, updatable = false)
    private Long appUserId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private AppUser appUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Map map;
}
