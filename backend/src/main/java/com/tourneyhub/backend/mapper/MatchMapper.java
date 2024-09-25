package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.*;
import com.tourneyhub.backend.dto.match.MatchCreateDto;
import com.tourneyhub.backend.dto.match.MatchDto;
import com.tourneyhub.backend.dto.match.MatchPlayerDto;
import com.tourneyhub.backend.service.EventParticipantService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MatchMapper {

    private final EventParticipantService service;

    public MatchMapper(EventParticipantService service) {
        this.service = service;
    }

    public MatchDto mapToDto(Event match) {
        List<EventParticipant> players = service.getParticipants(match, "player");
        EventParticipant player1 = players.get(0);
        EventParticipant player2 = players.get(1);
        EventParticipant referee = getParticipant(match, "referee");
        EventParticipant streamer = getParticipant(match, "streamer");

        return new MatchDto(
                match.getId(),
                match.getStage().getId(),
                match.getMatchId(),
                match.getCode(),
                match.isConcluded(),
                match.getTime(),
                player1.getScore(),
                player2.getScore(),
                player1.getTeamId() != null ? mapTeam(player1) : mapPlayer(player1),
                player2.getTeamId() != null ? mapTeam(player2) : mapPlayer(player2),
                referee != null ? referee.getAppUser().getName() : null,
                streamer != null ? streamer.getAppUser().getName() : null,
                service.getParticipants(match, "commentator").stream()
                        .map(p -> p.getAppUser().getName())
                        .toList());
    }

    public Event mapToEntity(MatchCreateDto dto, Stage stage) {
        return new Event(
                null,
                dto.getCode(),
                dto.getTime(),
                false,
                stage,
                new ArrayList<>()
        );
    }

    private MatchPlayerDto mapTeam(EventParticipant player) {
        Team team = player.getTeam();
        return new MatchPlayerDto(player.getId(), team.getName(), team.getLogo());
    }

    private MatchPlayerDto mapPlayer(EventParticipant player) {
        AppUser user = player.getAppUser();

        return new MatchPlayerDto(
                player.getId(),
                user.getName(),
                String.format("https://assets.ppy.sh/old-flags/%s.png", user.getCountry().getIso2()));
    }

    private EventParticipant getParticipant(Event match, String role) {
        return match
                .getParticipants().stream()
                .filter(p -> p.getRole().getName().equals(role))
                .findFirst()
                .orElse(null);
    }
}
