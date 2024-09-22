package com.tourneyhub.backend.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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

    @NotNull
    private boolean canRegWithRole;

    @ManyToOne(fetch = FetchType.LAZY)
    private Tournament tournament;

    @ManyToOne(fetch = FetchType.LAZY)
    private AppUser appUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Role role;
}
