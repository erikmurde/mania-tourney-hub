package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.domain.Role;
import com.tourneyhub.backend.domain.StaffRequest;
import com.tourneyhub.backend.domain.Tournament;
import com.tourneyhub.backend.domain.TournamentRole;
import com.tourneyhub.backend.dto.StaffApplicationDto;
import com.tourneyhub.backend.helper.Constants;
import com.tourneyhub.backend.mapper.StaffApplicationMapper;
import com.tourneyhub.backend.repository.StaffRequestRepository;
import com.tourneyhub.backend.repository.StatusRepository;
import com.tourneyhub.backend.repository.TournamentRoleRepository;
import com.tourneyhub.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;

@RestController
public class StaffApplicationController {

    private final UserService service;

    private final StaffRequestRepository staffRequestRepository;

    private final StatusRepository statusRepository;

    private final TournamentRoleRepository tournamentRoleRepository;

    private final StaffApplicationMapper mapper;

    public StaffApplicationController(
            UserService service,
            StaffRequestRepository staffRequestRepository,
            StatusRepository statusRepository,
            TournamentRoleRepository tournamentRoleRepository, StaffApplicationMapper mapper)
    {
        this.service = service;
        this.staffRequestRepository = staffRequestRepository;
        this.statusRepository = statusRepository;
        this.tournamentRoleRepository = tournamentRoleRepository;
        this.mapper = mapper;
    }

    @GetMapping("/api/staffApplications/user")
    public List<StaffApplicationDto> getAllUser(@AuthenticationPrincipal OAuth2User principal) {
        return staffRequestRepository
                .getAllUser(principal.getAttribute("id"))
                .stream()
                .map(mapper::mapToDto)
                .toList();
    }

    @GetMapping("/api/staffApplications/pending/{tournamentId}")
    @PreAuthorize("@userService.isHost(#tournamentId, principal)")
    public List<StaffApplicationDto> getAllPending(@PathVariable Long tournamentId) {
        return staffRequestRepository
                .getAllPendingInTournament(tournamentId)
                .stream()
                .map(mapper::mapToDto)
                .toList();
    }

    @PostMapping("/api/staffApplications")
    @PreAuthorize("#staffApplication.sender.playerId == principal.getAttribute('id')")
    public void create(
            @RequestBody StaffApplicationDto staffApplication, @AuthenticationPrincipal OAuth2User principal)
    {
        // Can't send application to own tournament
        if (service.isHost(staffApplication.getTournamentId(), principal)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        staffRequestRepository.save(mapper.mapToEntity(staffApplication));
    }

    @PutMapping("/api/staffApplications/{id}")
    @PreAuthorize(
            "@userService.isHost(#staffApplication.tournamentId, principal) || " +
            "#staffApplication.sender.playerId == principal.getAttribute('id')"
    )
    public void updateStatus(
            @PathVariable Long id,
            @RequestBody StaffApplicationDto staffApplication,
            @AuthenticationPrincipal OAuth2User principal)
    {
        StaffRequest staffRequest = staffRequestRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        boolean isOwner = Objects.equals(principal.getAttribute("id"), staffRequest.getSender().getPlayerId());
        boolean retracting = staffApplication.getStatus().equals("retracted");

        // Can't update non-pending application
        if (!staffRequest.getStatus().getName().equals("pending")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        // Can only retract own application, can't retract others' applications
        if (isOwner && !retracting || !isOwner && retracting) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        staffRequest.setStatus(statusRepository
                .findByName(staffApplication.getStatus())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));

        if (staffApplication.getStatus().equals("accepted")) {
            addTournamentRole(staffRequest);
        }
        staffRequestRepository.save(staffRequest);
    }

    private void addTournamentRole(StaffRequest staffRequest) {
        Tournament tournament = staffRequest.getTournament();
        Role role = staffRequest.getRole();

        tournamentRoleRepository.save(new TournamentRole(
                Constants.roleCanReg.get(role.getName()),
                tournament.getId(),
                tournament,
                staffRequest.getSender(),
                role
        ));
    }
}
