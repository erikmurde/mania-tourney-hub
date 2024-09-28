package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.*;
import org.springframework.stereotype.Component;

@Component
public class EventParticipantMapper {

    public EventParticipant mapToEntity(Event event, AppUser user, Team team, Role role) {
        return new EventParticipant(0, user.getId(), user, team.getId(), team, role, event);
    }
}
