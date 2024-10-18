package com.tourneyhub.backend.domain;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Role extends BaseEntityWithName {

    private Boolean canRegWithRole;
}
