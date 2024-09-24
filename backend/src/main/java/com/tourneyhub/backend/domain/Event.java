package com.tourneyhub.backend.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
public class Event extends BaseEntity {

    @Min(0)
    private Integer matchId;

    @Size(min = 1, max = 8)
    private String code;

    @NotNull
    private Date time;

    @NotNull
    private boolean concluded;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Stage stage;

    @OneToMany(
            mappedBy = "event",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<EventParticipant> participants;
}
