package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.StageType;
import com.tourneyhub.backend.dto.StageTypeDto;
import org.springframework.stereotype.Component;

@Component
public class StageTypeMapper {

    public StageTypeDto mapToDto(StageType stageType) {
        return new StageTypeDto(stageType.getId(), stageType.getName());
    }

    public StageType mapToEntity(StageTypeDto stageTypeDto) {
        var stageType = new StageType();

        stageType.setId(stageTypeDto.getId());
        stageType.setName(stageTypeDto.getName());

        return stageType;
    }
}
