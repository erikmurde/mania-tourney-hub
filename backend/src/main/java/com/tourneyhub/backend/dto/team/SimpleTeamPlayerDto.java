package com.tourneyhub.backend.dto.team;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SimpleTeamPlayerDto {

    private String name;

    private boolean teamCaptain;
}
