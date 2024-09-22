package com.tourneyhub.backend.dto.staffInvite;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StaffInviteDto {

    private Long id;

    private Long tournamentId;

    private Long recipientId;

    private String sender;

    private String tournament;

    private String role;

    private String status;

    private String description;
}
