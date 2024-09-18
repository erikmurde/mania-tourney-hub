package com.tourneyhub.backend.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.Date;
import java.util.List;

@Entity
public class Tournament extends BaseEntityWithName {

    @Size(min = 2, max = 16)
    private String code;

    @Size(min = 2, max = 512)
    private String description;

    @Pattern(regexp = URL_REGEX)
    private String banner;

    @Min(1)
    private int minTeamSize;

    @Min(1)
    private int maxTeamSize;

    @Min(0)
    private int minPlayerRank;

    @Min(0)
    private int maxPlayerRank;

    @NotNull
    private boolean concluded;

    @NotNull
    private boolean published;

    @NotNull
    private boolean playersPublic;

    @NotNull
    private boolean protects;

    @NotNull
    private boolean warmups;

    @NotNull
    private boolean  regsOpen;

    @NotNull
    private boolean applicationsOpen;

    @NotNull
    private Date regDeadline;

    @NotNull
    private Date applicationDeadline;

    @NotNull
    private String information;

    @ElementCollection
    @CollectionTable(name = "link")
    private List<Link> links;

    @ManyToMany
    @JoinTable(
            name = "restriction",
            joinColumns = @JoinColumn(name = "tournament_id"),
            inverseJoinColumns = @JoinColumn(name = "country_id")
    )
    private List<Country> countries;

    @OneToMany(mappedBy = "tournament")
    private List<Stage> stages;

    @OneToMany(mappedBy = "tournament")
    private List<TournamentPlayer> players;
}
