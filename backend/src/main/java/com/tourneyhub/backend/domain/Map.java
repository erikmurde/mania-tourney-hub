package com.tourneyhub.backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.*;

import java.util.List;

@Entity
public class Map extends BaseEntity {

    @Pattern(regexp = POS_NUM_REGEX)
    private String beatmapId;

    @Size(min = 1, max = 128)
    private String title;

    @Size(min = 1, max = 64)
    private String diff;

    @Size(min = 1, max = 64)
    private String artist;

    @Size(min = 1, max = 64)
    private String mapper;

    @Size(min = 1, max = 64)
    private String suggestor;

    @Pattern(regexp = URL_REGEX)
    private String cover;

    @Pattern(regexp = URL_REGEX)
    private String download;

    @Min(0)
    private Double sr;

    @Min(0)
    private Double bpm;

    @Min(0)
    @Max(10)
    private Double hp;

    @Min(0)
    @Max(10)
    private Double od;

    @Min(0)
    private int drainTime;

    @NotNull
    private boolean inMappool;

    @Min(0)
    private int index;

    private String comment;

    @ManyToOne
    @JoinColumn
    private MapType mapType;

    @OneToMany(mappedBy = "map")
    private List<MapScore> scores;

    @ManyToOne
    @JoinColumn
    private Stage stage;
}
