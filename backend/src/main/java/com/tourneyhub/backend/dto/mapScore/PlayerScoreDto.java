package com.tourneyhub.backend.dto.mapScore;

import com.tourneyhub.backend.dto.user.SimpleUserDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PlayerScoreDto {

    private SimpleUserDto player;

    private Integer score;

    private Double accuracy;

    private int run;
}
