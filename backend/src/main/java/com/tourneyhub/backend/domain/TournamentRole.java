package com.tourneyhub.backend.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
public class TournamentRole extends BaseEntity {

    @NotNull
    private boolean canRegWithRole;

    @Column(name = "tournament_id", insertable = false, updatable = false)
    private Long tournamentId;

    @ManyToOne(fetch = FetchType.LAZY)
    private AppUser appUser;

    @ManyToOne
    @JoinColumn
    private Role role;
}
