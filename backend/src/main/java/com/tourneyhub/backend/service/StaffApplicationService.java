package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.*;
import com.tourneyhub.backend.dto.staffApplication.StaffApplicationCreateDto;
import com.tourneyhub.backend.dto.staffApplication.StaffApplicationDto;
import com.tourneyhub.backend.dto.staffApplication.StaffApplicationEditDto;
import com.tourneyhub.backend.mapper.StaffApplicationMapper;
import com.tourneyhub.backend.repository.StaffRequestRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class StaffApplicationService {

    private final TournamentService tournamentService;

    private final StatusService statusService;

    private final TournamentRoleService tournamentRoleService;

    private final StaffRequestRepository staffRequestRepository;

    private final StaffApplicationMapper mapper;

    public StaffApplicationService(
            TournamentService tournamentService,
            StatusService statusService,
            TournamentRoleService tournamentRoleService,
            StaffRequestRepository staffRequestRepository,
            StaffApplicationMapper mapper)
    {
        this.tournamentService = tournamentService;
        this.statusService = statusService;
        this.tournamentRoleService = tournamentRoleService;
        this.staffRequestRepository = staffRequestRepository;
        this.mapper = mapper;
    }

    public List<StaffApplicationDto> getAllOfUser(Integer playerId) {
        return staffRequestRepository
                .getAllApplicationsOfUser(playerId).stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public List<StaffApplicationDto> getAllPending(Long tournamentId) {
        return staffRequestRepository
                .getAllApplicationsPendingInTournament(tournamentId).stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public void create(StaffApplicationCreateDto dto) {
        Tournament tournament = tournamentService.getTournament(dto.getTournamentId());

        if (!tournament.isApplicationsOpen() || new Date().after(tournament.getApplicationDeadline())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Status status = statusService.getEntityById(dto.getStatusId());

        if (!status.getName().equals("pending")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        staffRequestRepository.save(mapper.mapToEntity(dto, status));
    }

    public void updateStatus(Long staffApplicationId, StaffApplicationEditDto dto, Integer playerId) {
        StaffRequest application = getApplication(staffApplicationId);
        Status status = statusService.getEntityById(dto.getStatusId());

        boolean isOwner = Objects.equals(playerId, dto.getSenderPlayerId());
        boolean retracting = status.getName().equals("retracted");

        if (!application.getStatus().getName().equals("pending")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (isOwner && !retracting || !isOwner && retracting) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (status.getName().equals("accepted")) {
            tournamentRoleService
                    .create(application.getRole(), application.getTournament(), application.getSender());
        }
        application.setStatus(status);
        staffRequestRepository.save(application);
    }

    private StaffRequest getApplication(Long id) {
        return staffRequestRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
