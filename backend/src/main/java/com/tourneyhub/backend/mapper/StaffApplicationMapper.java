package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.StaffRequest;
import com.tourneyhub.backend.domain.Tournament;
import com.tourneyhub.backend.dto.StaffApplicationDto;
import com.tourneyhub.backend.repository.RoleRepository;
import com.tourneyhub.backend.repository.StatusRepository;
import com.tourneyhub.backend.repository.TournamentRepository;
import com.tourneyhub.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class StaffApplicationMapper {

    private final UserMapper userMapper;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final StatusRepository statusRepository;

    private final TournamentRepository tournamentRepository;

    public StaffApplicationMapper(
            UserMapper userMapper, UserRepository userRepository, RoleRepository roleRepository,
            StatusRepository statusRepository, TournamentRepository tournamentRepository)
    {
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.statusRepository = statusRepository;
        this.tournamentRepository = tournamentRepository;
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

    public StaffRequest mapToEntity(StaffApplicationDto staffApplication) {
        return new StaffRequest(
                staffApplication.getDescription(),
                userRepository
                        .findByPlayerId(staffApplication.getSender().getPlayerId())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST)),
                null,
                roleRepository
                        .findByName(staffApplication.getRole())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST)),
                statusRepository
                        .findByName(staffApplication.getStatus())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST)),
                tournamentRepository
                        .findById(staffApplication.getTournamentId())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST))
        );
    }
}
