package com.tourneyhub.backend.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.tourneyhub.backend.helper.Constants.URL_REGEX;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
public class Tournament extends BaseEntityWithName {

    @Size(min = 2, max = 16)
    private String code;

    @Size(min = 2, max = 512)
    @Column(length = 512)
    private String description;

    @Pattern(regexp = URL_REGEX)
    @Size(max = 512)
    @Column(length = 512)
    private String banner;

    @Min(1)
    private int minTeamSize;

    @Min(1)
    private int maxTeamSize;

    @Min(0)
    private int minPlayerRank;

    @Min(0)
    private int maxPlayerRank;

    @Min(1)
    @Max(10)
    private int keyCount;

    @NotNull
    private boolean concluded;

    @NotNull
    private boolean published;

    @NotNull
    private boolean playersPublished;

    @NotNull
    private boolean protects;

    @NotNull
    private boolean warmups;

    @NotNull
    private boolean  regsOpen;

    @NotNull
    private boolean applicationsOpen;

    private Date regDeadline;

    private Date applicationDeadline;

    @NotNull
    @Column(length = 1000000)
    private String information;

    @NotNull
    private String regMessage;

    @ElementCollection
    @CollectionTable(name = "link")
    private List<Link> links = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "restriction",
            joinColumns = @JoinColumn(name = "tournament_id"),
            inverseJoinColumns = @JoinColumn(name = "country_id")
    )
    private List<Country> countries = new ArrayList<>();

    @OneToMany(mappedBy = "tournament")
    private List<Stage> stages = new ArrayList<>();

    @OneToMany(mappedBy = "tournament")
    private List<TournamentPlayer> players = new ArrayList<>();
}
