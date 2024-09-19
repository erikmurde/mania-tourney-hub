package com.tourneyhub.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CountryDto {

    private String name;

    private String iso2;
}
