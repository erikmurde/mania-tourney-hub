package com.tourneyhub.backend.dto.team;

import com.tourneyhub.backend.dto.user.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class TeamDto {

    private Long id;

    private String name;

    private String logo;

    private String availability;

    private String status;

    private Integer seed;

    private Integer placement;

    private List<UserDto> players;
}
