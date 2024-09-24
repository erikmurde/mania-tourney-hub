package com.tourneyhub.backend.dto.team;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class SimpleTeamDto {

    private String name;

    private String logo;

    private List<SimpleTeamPlayerDto> players;
}
