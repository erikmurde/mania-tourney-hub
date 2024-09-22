package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.Status;
import com.tourneyhub.backend.dto.staffInvite.StaffInviteCreateDto;
import com.tourneyhub.backend.dto.staffInvite.StaffInviteDto;
import com.tourneyhub.backend.mapper.StaffInviteMapper;
import com.tourneyhub.backend.repository.StaffRequestRepository;
import com.tourneyhub.backend.repository.StatusRepository;
import com.tourneyhub.backend.repository.TournamentRoleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;

@Service
public class StaffInviteService {

    private final StaffRequestRepository staffRequestRepository;

    private final TournamentRoleRepository tournamentRoleRepository;

    private final StatusRepository statusRepository;

    private final StaffInviteMapper mapper;

    public StaffInviteService(
            StaffRequestRepository staffRequestRepository,
            TournamentRoleRepository tournamentRoleRepository,
            StatusRepository statusRepository,
            StaffInviteMapper mapper)
    {
        this.staffRequestRepository = staffRequestRepository;
        this.tournamentRoleRepository = tournamentRoleRepository;
        this.statusRepository = statusRepository;
        this.mapper = mapper;
    }

    public List<StaffInviteDto> getAllOfUser(OAuth2User principal) {
        return staffRequestRepository
                .getAllInvitesOfUser(principal.getAttribute("id"))
                .stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public void create(StaffInviteCreateDto dto, OAuth2User principal) {
        if (Objects.equals(principal.getAttribute("id"), dto.getRecipientId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (recipientAlreadyHasRole(dto) || isDuplicateInvite(dto)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Status status = statusRepository
                .findByName("pending")
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        staffRequestRepository.save(mapper.mapToEntity(dto, status));
    }

    public boolean recipientAlreadyHasRole(StaffInviteCreateDto dto) {
        return tournamentRoleRepository
                .getUserRoleInTournament(dto.getRecipientId(), dto.getTournamentId(), dto.getRoleId())
                .isPresent();
    }

    public boolean isDuplicateInvite(StaffInviteCreateDto dto) {
        return staffRequestRepository
                .getPendingInvite(dto.getRecipientId(), dto.getTournamentId(), dto.getRoleId())
                .isPresent();
    }
}
