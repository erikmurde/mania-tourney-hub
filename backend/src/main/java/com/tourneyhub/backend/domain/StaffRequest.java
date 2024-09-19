package com.tourneyhub.backend.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
public class StaffRequest extends BaseEntity {

    @Size(min = 1)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private AppUser sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private AppUser recipient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Tournament tournament;
}
