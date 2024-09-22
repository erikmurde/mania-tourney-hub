package com.tourneyhub.backend.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
public class AppUser extends BaseEntityWithName {

    private Integer playerId;

    private Integer rank;

    private String discordUsername;

    private Integer timezone;

    private String avatar;

    @ManyToOne
    @JoinColumn
    private Country country;

    @OneToMany(mappedBy = "appUser", fetch = FetchType.LAZY)
    private List<TournamentRole> roles = new ArrayList<>();

    @OneToMany(mappedBy = "appUser", fetch = FetchType.LAZY)
    private List<TournamentPlayer> stats = new ArrayList<>();
}
