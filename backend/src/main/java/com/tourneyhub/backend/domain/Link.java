package com.tourneyhub.backend.domain;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static com.tourneyhub.backend.helper.Constants.URL_REGEX;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Link {

    @Size(min = 2, max = 32)
    private String name;

    @Pattern(regexp = URL_REGEX)
    private String url;
}
