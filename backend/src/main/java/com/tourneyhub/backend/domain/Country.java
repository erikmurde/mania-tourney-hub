package com.tourneyhub.backend.domain;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
public class Country extends BaseEntityWithName {

    @Size(min = 2, max = 2)
    private String iso2;
}
