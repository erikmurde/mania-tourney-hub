package com.tourneyhub.backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.List;

import static com.tourneyhub.backend.helper.Constants.URL_REGEX;

@Entity
public class Team extends BaseEntityWithName {

    @NotNull
    @Pattern(regexp = URL_REGEX)
    private String logo;

    @NotNull
    @Size(min = 2, max = 256)
    private String availability;

    @OneToMany(mappedBy = "team")
    private List<TournamentPlayer> players;
}
