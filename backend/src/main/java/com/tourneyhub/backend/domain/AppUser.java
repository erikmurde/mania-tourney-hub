package com.tourneyhub.backend.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

import static com.tourneyhub.backend.helper.Constants.URL_REGEX;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
public class AppUser extends BaseEntityWithName {

    @Min(0)
    private Integer playerId;

    @Min(0)
    private Integer rank;

    @Size(max = 32)
    private String discordUsername;

    @Min(-11)
    @Max(12)
    private Integer timezone;

    @Pattern(regexp = URL_REGEX)
    private String avatar;

    @ManyToOne
    @JoinColumn
    private Country country;

    @OneToMany(mappedBy = "appUser")
    private List<TournamentRole> roles = new ArrayList<>();

    @OneToMany(mappedBy = "appUser")
    private List<TournamentPlayer> stats = new ArrayList<>();
}
