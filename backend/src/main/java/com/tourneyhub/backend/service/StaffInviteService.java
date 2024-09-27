package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.*;
import com.tourneyhub.backend.dto.staffInvite.StaffInviteEditDto;
import com.tourneyhub.backend.dto.staffInvite.StaffInviteCreateDto;
import com.tourneyhub.backend.dto.staffInvite.StaffInviteDto;
import com.tourneyhub.backend.mapper.StaffInviteMapper;
import com.tourneyhub.backend.repository.StaffRequestRepository;
import com.tourneyhub.backend.repository.TournamentRoleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;

@Service
public class StaffInviteService {

    private final TournamentRoleService tournamentRoleService;

    private final StatusService statusService;

    private final TournamentRoleRepository tournamentRoleRepository;

    private final StaffRequestRepository staffRequestRepository;

    private final StaffInviteMapper mapper;

    public StaffInviteService(
            TournamentRoleService tournamentRoleService,
            StatusService statusService,
            TournamentRoleRepository tournamentRoleRepository,
            StaffRequestRepository staffRequestRepository,
            StaffInviteMapper mapper)
    {
        this.tournamentRoleService = tournamentRoleService;
        this.statusService = statusService;
        this.tournamentRoleRepository = tournamentRoleRepository;
        this.staffRequestRepository = staffRequestRepository;
        this.mapper = mapper;
    }

    public List<StaffInviteDto> getAllOfUser(OAuth2User principal) {
        return staffRequestRepository
                .getAllInvitesOfUser(principal.getAttribute("id")).stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public Long create(StaffInviteCreateDto dto, OAuth2User principal) {
        if (Objects.equals(principal.getAttribute("id"), dto.getRecipientId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (recipientAlreadyHasRole(dto) || isDuplicateRequest(dto)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Status status = statusService.getEntityByName("pending");

        return staffRequestRepository.save(mapper.mapToEntity(dto, status)).getId();
    }

    public Long updateStatus(Long staffInviteId, StaffInviteEditDto dto) {
        StaffRequest staffInvite = getInvite(staffInviteId);
        Status status = statusService.getEntityByName(dto.getStatus());

        if (status.getName().equals("accepted")) {
            tournamentRoleService
                    .create(staffInvite.getRole(), staffInvite.getTournament(), staffInvite.getRecipient());
        }
        staffInvite.setStatus(status);
        return staffRequestRepository.save(staffInvite).getId();
    }

    private boolean recipientAlreadyHasRole(StaffInviteCreateDto dto) {
        return tournamentRoleRepository
                .getUserRoleInTournament(dto.getRecipientId(), dto.getTournamentId(), dto.getRoleId())
                .isPresent();
    }

    private boolean isDuplicateRequest(StaffInviteCreateDto dto) {
        boolean hasInvite = staffRequestRepository
                .getPendingInvite(dto.getRecipientId(), dto.getTournamentId(), dto.getRoleId())
                .isPresent();

        boolean hasApplication = staffRequestRepository
                .getPendingApplication(dto.getRecipientId(), dto.getTournamentId(), dto.getRoleId())
                .isPresent();

        return hasInvite || hasApplication;
    }

    private StaffRequest getInvite(Long id) {
        return staffRequestRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
