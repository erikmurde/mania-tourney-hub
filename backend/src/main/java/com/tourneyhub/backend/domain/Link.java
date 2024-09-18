package com.tourneyhub.backend.domain;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Embeddable
public class Link {

    @Size(min = 2, max = 32)
    private String name;

    @Pattern(regexp = "^(?:https?|ftp)://(?:www\\.)?[a-z0-9-]+(?:\\.[a-z0-9-]+)+\\S*/i$")
    private String link;
}
