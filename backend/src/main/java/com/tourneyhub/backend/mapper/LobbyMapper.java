package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.Event;
import com.tourneyhub.backend.domain.EventParticipant;
import com.tourneyhub.backend.domain.Stage;
import com.tourneyhub.backend.dto.lobby.LobbyCreateDto;
import com.tourneyhub.backend.dto.lobby.LobbyDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class LobbyMapper {

    public LobbyDto mapToDto(Event lobby) {
        List<String> players = filterParticipants(lobby, "player")
                .stream()
                .map(p -> p.getTeam() != null ? p.getTeam().getName() : p.getAppUser().getName())
                .toList();

        String referee = filterParticipants(lobby, "referee")
                .stream()
                .findFirst()
                .map(p -> p.getAppUser().getName())
                .orElse(null);

        return new LobbyDto(
                lobby.getId(),
                lobby.getStage().getId(),
                lobby.getMatchId(),
                lobby.getCode(),
                lobby.getTime(),
                lobby.isConcluded(),
                players,
                referee
        );
    }

    public Event mapToEntity(LobbyCreateDto dto, Stage stage) {
        return new Event(
                null,
                String.format("Q%02d", stage.getEvents().size() + 1),
                dto.getTime(),
                false,
                stage,
                new ArrayList<>()
        );
    }

    private List<EventParticipant> filterParticipants(Event lobby, String filter) {
        return lobby
                .getParticipants()
                .stream().filter(p -> p.getRole().getName().equals(filter))
                .toList();
    }
}
