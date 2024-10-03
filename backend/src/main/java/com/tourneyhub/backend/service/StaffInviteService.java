package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.*;
import com.tourneyhub.backend.dto.staffInvite.StaffInviteEditDto;
import com.tourneyhub.backend.dto.staffInvite.StaffInviteCreateDto;
import com.tourneyhub.backend.dto.staffInvite.StaffInviteDto;
import com.tourneyhub.backend.helper.Constants;
import com.tourneyhub.backend.mapper.StaffInviteMapper;
import com.tourneyhub.backend.mapper.TournamentRoleMapper;
import com.tourneyhub.backend.repository.RepositoryUow;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;

@Service
public class StaffInviteService {

    private final RepositoryUow uow;

    private final TournamentRoleMapper tournamentRoleMapper;

    private final StaffInviteMapper staffInviteMapper;

    public StaffInviteService(
            RepositoryUow uow, TournamentRoleMapper tournamentRoleMapper, StaffInviteMapper staffInviteMapper)
    {
        this.uow = uow;
        this.tournamentRoleMapper = tournamentRoleMapper;
        this.staffInviteMapper = staffInviteMapper;
    }

    public List<StaffInviteDto> getAllOfUser(Long currentUserId) {
        return uow.staffRequestRepository
                .getAllInvitesOfUser(currentUserId).stream()
                .map(staffInviteMapper::mapToDto)
                .toList();
    }

    public Long create(StaffInviteCreateDto dto, Long currentUserId) {
        if (Objects.equals(currentUserId, dto.getRecipientId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (recipientAlreadyHasRole(dto) || isDuplicateRequest(dto)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Status status = getStatus(Constants.PENDING);
        return uow.staffRequestRepository.save(staffInviteMapper.mapToEntity(dto, status)).getId();
    }

    public Long updateStatus(Long staffInviteId, StaffInviteEditDto dto) {
        StaffRequest invite = getInvite(staffInviteId);
        Status status = getStatus(dto.getStatus());

        if (status.getName().equals(Constants.ACCEPTED)) {
            uow.tournamentRoleRepository.save(
                    tournamentRoleMapper.mapToEntity(invite.getRole(), invite.getTournament(), invite.getRecipient())
            );
        }
        invite.setStatus(status);
        return uow.staffRequestRepository.save(invite).getId();
    }

    private boolean recipientAlreadyHasRole(StaffInviteCreateDto dto) {
        return uow.tournamentRoleRepository
                .getUserRoleInTournament(dto.getRecipientId(), dto.getTournamentId(), dto.getRoleId())
                .isPresent();
    }

    private boolean isDuplicateRequest(StaffInviteCreateDto dto) {
        boolean hasInvite = uow.staffRequestRepository
                .getPendingInvite(dto.getRecipientId(), dto.getTournamentId(), dto.getRoleId())
                .isPresent();

        boolean hasApplication = uow.staffRequestRepository
                .getPendingApplication(dto.getRecipientId(), dto.getTournamentId(), dto.getRoleId())
                .isPresent();

        return hasInvite || hasApplication;
    }

    private StaffRequest getInvite(Long id) {
        return uow.staffRequestRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    private Status getStatus(String name) {
        return uow.statusRepository
                .findByName(name)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
