package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.*;
import com.tourneyhub.backend.domain.exception.AppException;
import com.tourneyhub.backend.dto.staffApplication.StaffApplicationCreateDto;
import com.tourneyhub.backend.dto.staffApplication.StaffApplicationDto;
import com.tourneyhub.backend.dto.staffApplication.StaffApplicationEditDto;
import com.tourneyhub.backend.helper.Constants;
import com.tourneyhub.backend.mapper.StaffApplicationMapper;
import com.tourneyhub.backend.mapper.TournamentRoleMapper;
import com.tourneyhub.backend.repository.RepositoryUow;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class StaffApplicationService {

    private final RepositoryUow uow;

    private final TournamentRoleMapper tournamentRoleMapper;

    private final StaffApplicationMapper staffApplicationMapper;

    public StaffApplicationService(
            RepositoryUow uow,
            TournamentRoleMapper tournamentRoleMapper,
            StaffApplicationMapper staffApplicationMapper)
    {
        this.uow = uow;
        this.tournamentRoleMapper = tournamentRoleMapper;
        this.staffApplicationMapper = staffApplicationMapper;
    }

    public List<StaffApplicationDto> getAllOfUser(Long playerId) {
        return uow.staffRequestRepository
                .getAllApplicationsOfUser(playerId).stream()
                .map(staffApplicationMapper::mapToDto)
                .toList();
    }

    public List<StaffApplicationDto> getAllPending(Long tournamentId) {
        return uow.staffRequestRepository
                .getAllPendingApplicationsInTournament(tournamentId).stream()
                .map(staffApplicationMapper::mapToDto)
                .toList();
    }

    public void create(StaffApplicationCreateDto dto) {
        Tournament tournament = uow.tournamentRepository
                .findById(dto.getTournamentId())
                .orElseThrow(() -> new AppException(
                        String.format("No tournament with id %d", dto.getTournamentId()), HttpStatus.NOT_FOUND));

        if (!tournament.isApplicationsOpen() || new Date().after(tournament.getApplicationDeadline())) {
            throw new AppException("Staff applications are closed!", HttpStatus.BAD_REQUEST);
        }
        Status status = getStatus(dto.getStatusId());

        if (!status.getName().equals(Constants.PENDING)) {
            throw new AppException("Invalid status!", HttpStatus.BAD_REQUEST);
        }
        uow.staffRequestRepository.save(staffApplicationMapper.mapToEntity(dto, status));
    }

    public void updateStatus(Long staffApplicationId, StaffApplicationEditDto dto, Long currentPlayerId) {
        StaffRequest application = getApplication(staffApplicationId);
        Status status = getStatus(dto.getStatusId());

        boolean isOwner = Objects.equals(currentPlayerId, dto.getSenderId());
        boolean retracting = status.getName().equals(Constants.RETRACTED);

        if (!application.getStatus().getName().equals(Constants.PENDING)) {
            throw new AppException("Invalid status!", HttpStatus.BAD_REQUEST);
        }
        if (isOwner && !retracting || !isOwner && retracting) {
            throw new AppException(Constants.NO_PERMISSION, HttpStatus.FORBIDDEN);
        }
        if (status.getName().equals(Constants.ACCEPTED)) {
            uow.tournamentRoleRepository
                    .save(tournamentRoleMapper
                            .mapToEntity(application.getRole(), application.getTournament(), application.getSender()));
        }
        application.setStatus(status);
        uow.staffRequestRepository.save(application);
    }

    private StaffRequest getApplication(Long id) {
        return uow.staffRequestRepository
                .findById(id)
                .orElseThrow(() -> new AppException(
                        String.format("No staff request with id %d", id), HttpStatus.NOT_FOUND));
    }

    private Status getStatus(Long id) {
        return uow.statusRepository
                .findById(id)
                .orElseThrow(() -> new AppException(
                        String.format("No status with id %d", id), HttpStatus.NOT_FOUND));
    }
}
