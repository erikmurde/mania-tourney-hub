package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.Country;
import com.tourneyhub.backend.dto.CountryDto;
import org.springframework.stereotype.Component;

@Component
public class CountryMapper {

    public CountryDto mapToDto(Country country) {
        return new CountryDto(country.getName(), country.getIso2());
    }
}
