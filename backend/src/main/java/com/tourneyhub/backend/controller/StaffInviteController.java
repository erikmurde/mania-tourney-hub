package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.staffInvite.StaffInviteEditDto;
import com.tourneyhub.backend.dto.staffInvite.StaffInviteCreateDto;
import com.tourneyhub.backend.dto.staffInvite.StaffInviteDto;
import com.tourneyhub.backend.service.StaffInviteService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StaffInviteController {

    private final StaffInviteService service;

    public StaffInviteController(StaffInviteService service) {
        this.service = service;
    }

    @GetMapping("/api/staffInvites/user")
    public List<StaffInviteDto> getAllOfUser(@AuthenticationPrincipal OAuth2User principal) {
        return service.getAllOfUser(principal.getAttribute("id"));
    }

    @PostMapping("/api/staffInvites")
    @PreAuthorize("@userService.isHost(#dto.tournamentId, principal)")
    public Long create(
            @RequestBody @Valid StaffInviteCreateDto dto, @AuthenticationPrincipal OAuth2User principal)
    {
        return service.create(dto, principal.getAttribute("id"));
    }

    @PutMapping("/api/staffInvites/{staffInviteId}")
    @PreAuthorize("@userService.isOwner(#dto.recipientPlayerId, principal)")
    public Long updateStatus(@PathVariable Long staffInviteId, @RequestBody @Valid StaffInviteEditDto dto) {
        return service.updateStatus(staffInviteId, dto);
    }
}
