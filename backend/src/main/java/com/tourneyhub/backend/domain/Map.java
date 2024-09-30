package com.tourneyhub.backend.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

import static com.tourneyhub.backend.helper.Constants.URL_REGEX;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
public class Map extends BaseEntity {

    @Min(0)
    private Integer beatmapId;

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

    private String songPreview;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private MapType mapType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Stage stage;

    @OneToMany(mappedBy = "map", cascade = CascadeType.REMOVE)
    private List<MapScore> scores = new ArrayList<>();
}
