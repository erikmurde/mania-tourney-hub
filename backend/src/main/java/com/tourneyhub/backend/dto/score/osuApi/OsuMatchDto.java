package com.tourneyhub.backend.dto.score.osuApi;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class OsuMatchDto {

    private List<OsuMatchEventDto> events = new ArrayList<>();
}
