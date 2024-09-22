package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.StaffRequest;
import com.tourneyhub.backend.domain.Status;
import com.tourneyhub.backend.domain.Tournament;
import com.tourneyhub.backend.dto.staffInvite.StaffInviteCreateDto;
import com.tourneyhub.backend.dto.staffInvite.StaffInviteDto;
import com.tourneyhub.backend.repository.RoleRepository;
import com.tourneyhub.backend.repository.TournamentRepository;
import com.tourneyhub.backend.repository.UserRepository;
import org.springframework.stereotype.Component;

@Component
public class StaffInviteMapper {

    private final TournamentRepository tournamentRepository;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    public StaffInviteMapper(
            TournamentRepository tournamentRepository, UserRepository userRepository, RoleRepository roleRepository)
    {
        this.tournamentRepository = tournamentRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public StaffInviteDto mapToDto(StaffRequest staffRequest) {
        Tournament tournament = staffRequest.getTournament();

        return new StaffInviteDto(
                tournament.getId(),
                staffRequest.getTournament().getId(),
                staffRequest.getRecipient().getId(),
                staffRequest.getSender().getName(),
                tournament.getName(),
                staffRequest.getRole().getName(),
                staffRequest.getStatus().getName(),
                staffRequest.getDescription()
        );
    }

    public StaffRequest mapToEntity(StaffInviteCreateDto dto, Status status) {
        return new StaffRequest(
                dto.getDescription(),
                userRepository.getReferenceById(dto.getSenderId()),
                userRepository.getReferenceById(dto.getRecipientId()),
                roleRepository.getReferenceById(dto.getRoleId()),
                status,
                tournamentRepository.getReferenceById(dto.getTournamentId())
        );
    }
}
