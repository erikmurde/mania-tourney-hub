package com.tourneyhub.backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.Date;
import java.util.List;

@Entity
public class Event extends BaseEntity {

    @Size(min = 1, max = 8)
    private String code;

    @NotNull
    private Date time;

    @Pattern(regexp = URL_REGEX)
    private String mpLink;

    @NotNull
    private boolean concluded;

    @ManyToOne
    @JoinColumn
    private Stage stage;

    @OneToMany(mappedBy = "event")
    private List<EventParticipant> participants;
}
