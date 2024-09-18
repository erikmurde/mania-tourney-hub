package com.tourneyhub.backend.domain;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class Country extends BaseEntityWithName {

    @Size(min = 2, max = 2)
    private String iso2;
}
