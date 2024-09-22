package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.staffApplication.StaffApplicationCreateDto;
import com.tourneyhub.backend.dto.staffApplication.StaffApplicationDto;
import com.tourneyhub.backend.dto.staffApplication.StaffApplicationEditDto;
import com.tourneyhub.backend.service.StaffApplicationService;
import com.tourneyhub.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class StaffApplicationController {

    private final UserService userService;

    private final StaffApplicationService staffApplicationService;

    public StaffApplicationController(UserService userService, StaffApplicationService staffApplicationService)
    {
        this.userService = userService;
        this.staffApplicationService = staffApplicationService;
    }

    @GetMapping("/api/staffApplications/user")
    public List<StaffApplicationDto> getAllOfUser(@AuthenticationPrincipal OAuth2User principal) {
        return staffApplicationService
                .getAllOfUser(principal.getAttribute("id"));
    }

    @GetMapping("/api/staffApplications/pending/{tournamentId}")
    @PreAuthorize("@userService.isHost(#tournamentId, principal)")
    public List<StaffApplicationDto> getAllPending(@PathVariable Long tournamentId) {
        return staffApplicationService
                .getAllPending(tournamentId);
    }

    @PostMapping("/api/staffApplications")
    @PreAuthorize("#staffApplication.senderId == principal.getAttribute('id')")
    public void create(
            @RequestBody @Valid StaffApplicationCreateDto staffApplication,
            @AuthenticationPrincipal OAuth2User principal)
    {
        // Can't send application to own tournament
        if (userService.isHost(staffApplication.getTournamentId(), principal)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        staffApplicationService.create(staffApplication);
    }

    @PutMapping("/api/staffApplications/{id}")
    @PreAuthorize(
            "@userService.isHost(#staffApplication.tournamentId, principal) || " +
            "#staffApplication.senderId == principal.getAttribute('id')"
    )
    public void updateStatus(
            @PathVariable Long id,
            @RequestBody @Valid StaffApplicationEditDto staffApplication,
            @AuthenticationPrincipal OAuth2User principal)
    {
        staffApplicationService
                .updateStatus(id, staffApplication.getStatusId(), principal.getAttribute("id"));
    }
}
