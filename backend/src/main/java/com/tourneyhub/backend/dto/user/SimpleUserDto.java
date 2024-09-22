package com.tourneyhub.backend.dto.user;

import com.tourneyhub.backend.dto.CountryDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class SimpleUserDto {

    private Long id;

    private Integer playerId;

    private String name;

    private CountryDto country;

    private List<String> roles;
}
