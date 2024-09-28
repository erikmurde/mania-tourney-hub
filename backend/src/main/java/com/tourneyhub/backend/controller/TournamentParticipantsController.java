package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.user.UserDto;
import com.tourneyhub.backend.service.TournamentService;
import com.tourneyhub.backend.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TournamentParticipantsController {

    private final TournamentService tournamentService;

    private final UserService userService;

    public TournamentParticipantsController(TournamentService tournamentService, UserService userService) {
        this.tournamentService = tournamentService;
        this.userService = userService;
    }

    @GetMapping("/api/tournamentParticipants/{tournamentId}/staff")
    public List<UserDto> getTournamentStaff(@PathVariable Long tournamentId) {
        return userService.getTournamentStaff(tournamentId);
    }

    @GetMapping("/api/tournamentParticipants/{tournamentId}/players")
    public List<UserDto> getTournamentPlayers(
            @PathVariable Long tournamentId, @AuthenticationPrincipal OAuth2User principal)
    {
        return userService.getTournamentPlayers(tournamentId, principal);
    }

    @PostMapping("/api/tournamentParticipants/{tournamentId}/register")
    public void registerPlayer(@PathVariable Long tournamentId, @AuthenticationPrincipal OAuth2User principal) {
        tournamentService.registerPlayer(tournamentId, principal.getAttribute("id"));
    }
}
