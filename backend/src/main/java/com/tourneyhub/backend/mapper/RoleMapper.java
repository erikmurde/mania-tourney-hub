package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.Role;
import com.tourneyhub.backend.dto.RoleDto;
import org.springframework.stereotype.Component;

@Component
public class RoleMapper {

    public RoleDto mapToDto(Role role) {
        return new RoleDto(role.getId(), role.getName());
    }
}
