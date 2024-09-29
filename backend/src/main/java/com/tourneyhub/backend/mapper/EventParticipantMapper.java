package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.*;
import org.springframework.stereotype.Component;

@Component
public class EventParticipantMapper {

    public EventParticipant mapToEntity(Event event, AppUser user, Team team, Role role) {
        Long userId = user != null ? user.getId() : null;
        Long teamId = team != null ? team.getId() : null;

        return new EventParticipant(0, userId, user, teamId, team, role, event);
    }
}
