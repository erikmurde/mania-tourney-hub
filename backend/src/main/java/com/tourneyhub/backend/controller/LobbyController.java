package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.lobby.LobbyCreateDto;
import com.tourneyhub.backend.dto.lobby.LobbyDto;
import com.tourneyhub.backend.dto.lobby.LobbyEditDto;
import com.tourneyhub.backend.dto.lobby.LobbyRegisterDto;
import com.tourneyhub.backend.service.LobbyService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class LobbyController {

    private final LobbyService service;

    public LobbyController(LobbyService service) {
        this.service = service;
    }

    @GetMapping("/api/lobbies/{stageId}")
    public List<LobbyDto> getAllByStageId(
            @PathVariable Long stageId, @AuthenticationPrincipal OAuth2User principal)
    {
        return service.getAllByStageId(stageId, principal);
    }

    @PostMapping("/api/lobbies")
    public Long create(@RequestBody @Valid LobbyCreateDto dto, @AuthenticationPrincipal OAuth2User principal) {
        return service.create(dto, principal);
    }

    @PutMapping("/api/lobbies/{lobbyId}")
    public Long update(
            @PathVariable Long lobbyId,
            @RequestBody @Valid LobbyEditDto dto,
            @AuthenticationPrincipal OAuth2User principal)
    {
        return service.update(lobbyId, dto, principal);
    }

    @PutMapping("/api/lobbies/{lobbyId}/register")
    public Long registerParticipant(
            @PathVariable Long lobbyId,
            @RequestBody @Valid LobbyRegisterDto dto,
            @AuthenticationPrincipal OAuth2User principal)
    {
        return service.registerParticipant(lobbyId, dto, principal);
    }

    @PutMapping("/api/lobbies/{lobbyId}/unregister")
    public Long unregisterParticipant(
            @PathVariable Long lobbyId,
            @RequestBody @Valid LobbyRegisterDto dto,
            @AuthenticationPrincipal OAuth2User principal)
    {
        return service.unregisterParticipant(lobbyId, dto, principal);
    }

    @DeleteMapping("/api/lobbies/{lobbyId}")
    public Long delete(@PathVariable Long lobbyId, @AuthenticationPrincipal OAuth2User principal) {
        return service.delete(lobbyId, principal);
    }
}
