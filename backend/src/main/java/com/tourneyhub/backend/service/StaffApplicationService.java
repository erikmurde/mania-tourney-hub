package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.*;
import com.tourneyhub.backend.dto.staffApplication.StaffApplicationCreateDto;
import com.tourneyhub.backend.dto.staffApplication.StaffApplicationDto;
import com.tourneyhub.backend.dto.staffApplication.StaffApplicationEditDto;
import com.tourneyhub.backend.mapper.StaffApplicationMapper;
import com.tourneyhub.backend.repository.StaffRequestRepository;
import com.tourneyhub.backend.repository.StatusRepository;
import com.tourneyhub.backend.repository.TournamentRoleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static com.tourneyhub.backend.helper.Constants.ROLE_CAN_REG;

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

    public List<StaffApplicationDto> getAllOfUser(Integer playerId) {
        return staffRequestRepository
                .getAllApplicationsOfUser(playerId)
                .stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public List<StaffApplicationDto> getAllPending(Long tournamentId) {
        return staffRequestRepository
                .getAllApplicationsPendingInTournament(tournamentId)
                .stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public void create(StaffApplicationCreateDto dto) {
        Status status = statusRepository
                .findById(dto.getStatusId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (!status.getName().equals("pending")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        staffRequestRepository.save(mapper.mapToEntity(dto, status));
    }

    public void updateStatus(Long staffApplicationId,StaffApplicationEditDto dto, Integer playerId) {
        StaffRequest application = staffRequestRepository
                .findById(staffApplicationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Status status = statusRepository
                .findById(dto.getStatusId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        boolean isOwner = playerId.equals(dto.getSenderPlayerId());
        boolean retracting = status.getName().equals("retracted");

        if (!application.getStatus().getName().equals("pending")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (isOwner && !retracting || !isOwner && retracting) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (status.getName().equals("accepted")) {
            addTournamentRole(application.getRole(), application.getTournament(), application.getSender());
        }
        application.setStatus(status);
        staffRequestRepository.save(application);
    }

    private void addTournamentRole(Role role, Tournament tournament, AppUser user) {
        tournamentRoleRepository.save(
                new TournamentRole(ROLE_CAN_REG.get(role.getName()), tournament, user, role)
        );
    }
}
