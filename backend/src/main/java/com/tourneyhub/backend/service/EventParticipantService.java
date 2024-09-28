package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.Event;
import com.tourneyhub.backend.domain.EventParticipant;
import com.tourneyhub.backend.mapper.EventParticipantMapper;
import com.tourneyhub.backend.repository.RepositoryUow;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class EventParticipantService {

    private final RepositoryUow uow;

    private final EventParticipantMapper mapper;

    public EventParticipantService(RepositoryUow uow, EventParticipantMapper mapper) {
        this.uow = uow;
        this.mapper = mapper;
    }

    public List<EventParticipant> getParticipants(Event event, String role) {
        return event
                .getParticipants().stream()
                .filter(p -> p.getRole().getName().equals(role))
                .toList();
    }

    public void addReferee(Event lobby, Long refereeId) {
        if (refereeId != null) {
            addParticipant(lobby, refereeId, "referee", false);
        }
    }

    public void addStreamer(Event lobby, Long streamerId) {
        if (streamerId != null) {
            addParticipant(lobby, streamerId, "streamer", false);
        }
    }

    public void addCommentators(Event lobby, List<Long> commentatorIds) {
        for (Long id : commentatorIds) {
            addParticipant(lobby, id, "commentator", false);
        }
    }

    public void addParticipant(Event event, Long participantId, String role, boolean team) {
        EventParticipant participant = mapper.mapToEntity(
                event,
                team ? null : uow.userRepository.getReferenceById(participantId),
                team ? uow.teamRepository.getReferenceById(participantId) : null,
                uow.roleRepository.findByName(role).orElseThrow(IllegalArgumentException::new));

        event.getParticipants().add(participant);
    }

    public void removeParticipants(Event event, String role) {
        event.getParticipants().removeIf(p -> p.getRole().getName().equals(role));
    }

    public void removeParticipant(Event event, Long participantId, String role, boolean team) {
        event.getParticipants().removeIf(p ->
                Objects.equals((team ? p.getTeamId() : p.getAppUserId()), participantId)
                && p.getRole().getName().equals(role)
        );
    }
}
