package com.tourneyhub.backend.dto.tournament;

import com.tourneyhub.backend.dto.LinkDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class TournamentDto {

    private Long id;

    private String name;

    private String code;

    private String description;

    private String banner;

    private Integer keyCount;

    private Integer minTeamSize;

    private Integer maxTeamSize;

    private Integer minPlayerRank;

    private Integer maxPlayerRank;

    private boolean concluded;

    private boolean published;

    private boolean playersPublished;

    private boolean protects;

    private boolean warmups;

    private boolean regsOpen;

    private boolean applicationsOpen;

    private Date regDeadline;

    private Date applicationDeadline;

    private String information;

    private String regMessage;

    private List<String> countries;

    private List<LinkDto> links;
}
