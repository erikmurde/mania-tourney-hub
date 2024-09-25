package com.tourneyhub.backend.dto.match;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MatchPlayerDto {

    private Long id;

    private String name;

    private String logo;
}
