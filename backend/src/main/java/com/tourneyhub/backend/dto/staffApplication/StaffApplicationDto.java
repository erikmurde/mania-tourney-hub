package com.tourneyhub.backend.dto.staffApplication;

import com.tourneyhub.backend.dto.user.SimpleUserDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StaffApplicationDto {

    private Long id;

    private Long tournamentId;

    private SimpleUserDto sender;

    private String tournament;

    private String role;

    private String status;

    private String description;
}
