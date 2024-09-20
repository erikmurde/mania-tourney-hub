package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.StaffRequest;
import com.tourneyhub.backend.domain.Status;
import com.tourneyhub.backend.domain.Tournament;
import com.tourneyhub.backend.dto.staffApplication.StaffApplicationCreateDto;
import com.tourneyhub.backend.dto.staffApplication.StaffApplicationDto;
import com.tourneyhub.backend.repository.RoleRepository;
import com.tourneyhub.backend.repository.TournamentRepository;
import com.tourneyhub.backend.repository.UserRepository;
import org.springframework.stereotype.Component;

@Component
public class StaffApplicationMapper {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final TournamentRepository tournamentRepository;

    private final UserMapper userMapper;

    public StaffApplicationMapper(
            UserRepository userRepository,
            RoleRepository roleRepository,
            TournamentRepository tournamentRepository,
            UserMapper userMapper)
    {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.tournamentRepository = tournamentRepository;
        this.userMapper = userMapper;
    }

    public StaffApplicationDto mapToDto(StaffRequest staffRequest) {
        Tournament tournament = staffRequest.getTournament();

        return new StaffApplicationDto(
                staffRequest.getId(),
                tournament.getId(),
                userMapper.mapToSimpleDto(staffRequest.getSender()),
                tournament.getName(),
                staffRequest.getRole().getName(),
                staffRequest.getStatus().getName(),
                staffRequest.getDescription()
        );
    }

    public StaffRequest mapToEntity(StaffApplicationCreateDto staffApplication, Status status) {
        return new StaffRequest(
                staffApplication.getDescription(),
                userRepository.getReferenceById(staffApplication.getSenderId()),
                null,
                roleRepository.getReferenceById(staffApplication.getRoleId()),
                status,
                tournamentRepository.getReferenceById(staffApplication.getTournamentId())
        );
    }
}
