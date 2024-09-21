package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.MapType;
import com.tourneyhub.backend.dto.MapTypeDto;
import org.springframework.stereotype.Component;

@Component
public class MapTypeMapper {

    public MapTypeDto mapToDto(MapType mapType) {
        return new MapTypeDto(mapType.getId(), mapType.getName());
    }
}
