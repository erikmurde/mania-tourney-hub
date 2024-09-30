package com.tourneyhub.backend.dto.mapScore.osuApi;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class OsuMatchDto {

    private List<OsuMatchEventDto> events = new ArrayList<>();
}
