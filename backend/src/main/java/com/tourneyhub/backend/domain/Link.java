package com.tourneyhub.backend.domain;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import static com.tourneyhub.backend.helper.Constants.URL_REGEX;

@Embeddable
@Data
public class Link {

    @Size(min = 2, max = 32)
    private String name;

    @Pattern(regexp = URL_REGEX)
    private String url;
}
