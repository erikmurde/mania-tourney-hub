package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.Role;
import com.tourneyhub.backend.domain.StaffRequest;
import com.tourneyhub.backend.domain.Status;
import com.tourneyhub.backend.domain.TournamentRole;
import com.tourneyhub.backend.dto.staffApplication.StaffApplicationCreateDto;
import com.tourneyhub.backend.dto.staffApplication.StaffApplicationDto;
import com.tourneyhub.backend.helper.Constants;
import com.tourneyhub.backend.mapper.StaffApplicationMapper;
import com.tourneyhub.backend.repository.StaffRequestRepository;
import com.tourneyhub.backend.repository.StatusRepository;
import com.tourneyhub.backend.repository.TournamentRoleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;

@Service
public class StaffApplicationService {

    private final StaffRequestRepository staffRequestRepository;

    private final TournamentRoleRepository tournamentRoleRepository;

    private final StatusRepository statusRepository;

    private final StaffApplicationMapper mapper;

    public StaffApplicationService(
            StaffRequestRepository staffRequestRepository,
            TournamentRoleRepository tournamentRoleRepository,
            StatusRepository statusRepository,
            StaffApplicationMapper mapper)
    {
        this.staffRequestRepository = staffRequestRepository;
        this.tournamentRoleRepository = tournamentRoleRepository;
        this.statusRepository = statusRepository;
        this.mapper = mapper;
    }

    public List<StaffApplicationDto> getAllUser(Integer playerId) {
        return staffRequestRepository
                .getAllUser(playerId)
                .stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public List<StaffApplicationDto> getAllPending(Long tournamentId) {
        return staffRequestRepository
                .getAllPendingInTournament(tournamentId)
                .stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public void create(StaffApplicationCreateDto staffApplication) {
        System.out.println("APPLICATION: " + staffApplication);

        Status status = statusRepository
                .findById(staffApplication.getStatusId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (!status.getName().equals("pending")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        staffRequestRepository.save(mapper.mapToEntity(staffApplication, status));
    }

    public void updateStatus(Long applicationId, Long statusId, Integer playerId) {
        StaffRequest staffRequest = staffRequestRepository
                .findById(applicationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Status status = statusRepository
                .findById(statusId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        boolean isOwner = Objects.equals(playerId, staffRequest.getSender().getPlayerId());
        boolean retracting = status.getName().equals("retracted");

        if (!staffRequest.getStatus().getName().equals("pending")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (isOwner && !retracting || !isOwner && retracting) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (status.getName().equals("accepted")) {
            addTournamentRole(staffRequest);
        }
        staffRequest.setStatus(status);
        staffRequestRepository.save(staffRequest);
    }

    private void addTournamentRole(StaffRequest staffRequest) {
        Role role = staffRequest.getRole();

        tournamentRoleRepository.save(new TournamentRole(
                Constants.roleCanReg.get(role.getName()),
                staffRequest.getTournament(),
                staffRequest.getSender(),
                role
        ));
    }
}
