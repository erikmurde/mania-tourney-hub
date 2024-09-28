package com.tourneyhub.backend.domain;

import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

@MappedSuperclass
@Data
@EqualsAndHashCode(callSuper = true)
public class BaseEntityWithName extends BaseEntity {

    @NotNull
    @Size(min = 1, max = 128)
    protected String name;
}
