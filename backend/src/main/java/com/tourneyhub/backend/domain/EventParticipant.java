package com.tourneyhub.backend.domain;

import jakarta.persistence.*;
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
public class EventParticipant extends BaseEntity {

    @Min(-1)
    private int score;

    @Column(name = "app_user_id", insertable=false, updatable=false)
    private Long appUserId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private AppUser appUser;

    @Column(name = "team_id", insertable=false, updatable=false)
    private Long teamId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Event event;
}
