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
        return staffApplicationService.getAllOfUser(principal.getAttribute("id"));
    }

    @GetMapping("/api/staffApplications/pending/{tournamentId}")
    @PreAuthorize("@userService.isHost(#tournamentId, principal)")
    public List<StaffApplicationDto> getAllPending(@PathVariable Long tournamentId) {
        return staffApplicationService
                .getAllPending(tournamentId);
    }

    @PostMapping("/api/staffApplications")
    @PreAuthorize("@userService.isOwner(#dto.senderId, #principal)")
    public void create(
            @RequestBody @Valid StaffApplicationCreateDto dto,
            @AuthenticationPrincipal OAuth2User principal)
    {
        if (userService.isHost(dto.getTournamentId(), principal)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        staffApplicationService.create(dto);
    }

    @PutMapping("/api/staffApplications/{staffApplicationId}")
    @PreAuthorize(
            "@userService.isHost(#dto.tournamentId, principal) || " +
            "@userService.isOwner(#dto.senderId, principal)"
    )
    public void updateStatus(
            @PathVariable Long staffApplicationId,
            @RequestBody @Valid StaffApplicationEditDto dto,
            @AuthenticationPrincipal OAuth2User principal)
    {
        staffApplicationService.updateStatus(staffApplicationId, dto, principal.getAttribute("id"));
    }
}
