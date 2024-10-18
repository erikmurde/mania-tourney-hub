package com.tourneyhub.backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
public class TournamentRole extends BaseEntity {

    @Column(name = "tournament_id", insertable = false, updatable = false)
    private Long tournamentId;

    @ManyToOne(fetch = FetchType.LAZY)
    private Tournament tournament;

    @ManyToOne(fetch = FetchType.LAZY)
    private AppUser appUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Role role;
}
