package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.Event;
import com.tourneyhub.backend.domain.EventParticipant;
import com.tourneyhub.backend.repository.RoleRepository;
import com.tourneyhub.backend.repository.TeamRepository;
import com.tourneyhub.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class EventParticipantService {

    private final UserRepository userRepository;

    private final TeamRepository teamRepository;

    private final RoleRepository roleRepository;

    public EventParticipantService(
            UserRepository userRepository, TeamRepository teamRepository, RoleRepository roleRepository)
    {
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.roleRepository = roleRepository;
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
        var participant = new EventParticipant();

        participant.setScore(0);
        participant.setAppUser(team ? null : userRepository.getReferenceById(participantId));
        participant.setTeam(team ? teamRepository.getReferenceById(participantId) : null);
        participant.setRole(roleRepository.findByName(role).orElseThrow(IllegalArgumentException::new));
        participant.setEvent(event);

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
