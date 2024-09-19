package com.tourneyhub.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SimpleUserDto {

    private Integer playerId;

    private String name;

    private CountryDto country;
}
