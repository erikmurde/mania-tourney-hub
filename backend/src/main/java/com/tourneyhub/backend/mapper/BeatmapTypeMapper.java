package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.BeatmapType;
import com.tourneyhub.backend.dto.BeatmapTypeDto;
import org.springframework.stereotype.Component;

@Component
public class BeatmapTypeMapper {

    public BeatmapTypeDto mapToDto(BeatmapType mapType) {
        return new BeatmapTypeDto(mapType.getId(), mapType.getName());
    }
}
