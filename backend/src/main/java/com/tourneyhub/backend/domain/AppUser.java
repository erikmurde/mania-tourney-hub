package com.tourneyhub.backend.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.List;

@Entity
public class AppUser extends BaseEntityWithName {

    @Pattern(regexp = POS_NUM_REGEX)
    private String playerId;

    @Min(0)
    private int rank;

    @Size(min = 2, max = 32)
    private String discordUsername;

    @Min(-11)
    @Max(12)
    private int timezone;

    @Pattern(regexp = URL_REGEX)
    private String avatar;

    @ManyToOne
    @JoinColumn
    private Country country;

    @OneToMany(mappedBy = "appUser")
    private List<TournamentRole> roles;

    @OneToMany(mappedBy = "appUser")
    private List<TournamentPlayer> stats;
}
