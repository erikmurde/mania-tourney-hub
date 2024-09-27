package com.tourneyhub.backend.dto.tournament;

import com.tourneyhub.backend.dto.LinkDto;
import com.tourneyhub.backend.helper.Constants;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class TournamentCreateDto {

    @NotNull
    @Size(min = 2, max = 64)
    private String name;

    @NotNull
    @Size(min = 2, max = 12)
    private String code;

    @NotNull
    private String description;

    @NotNull
    @Pattern(regexp = Constants.URL_REGEX)
    private String banner;

    @NotNull
    @Min(1)
    @Max(10)
    private Integer keyCount;

    @NotNull
    @Min(1)
    @Max(10)
    private Integer minTeamSize;

    @NotNull
    @Min(1)
    @Max(10)
    private Integer maxTeamSize;

    @NotNull
    @Min(0)
    private Integer minPlayerRank;

    @NotNull
    @Min(0)
    private Integer maxPlayerRank;

    @NotNull
    private boolean protects;

    @NotNull
    private boolean warmups;

    @NotNull
    private boolean regsOpen;

    @NotNull
    private boolean applicationsOpen;

    @Future
    private Date regDeadline;

    @Future
    private Date applicationDeadline;

    private String regMessage;

    @NotNull
    private List<String> countries;

    @NotNull
    private List<LinkDto> links;

    @NotNull
    @Size(min = 1)
    private List<String> hostRoles;
}
