package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.Status;
import com.tourneyhub.backend.dto.StatusDto;
import org.springframework.stereotype.Component;

@Component
public class StatusMapper {

    public StatusDto mapToDto(Status status) {
        return new StatusDto(status.getId(), status.getName());
    }
}
