package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.Event;
import com.tourneyhub.backend.domain.Tournament;
import com.tourneyhub.backend.domain.exception.AppException;
import com.tourneyhub.backend.repository.EventRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import static com.tourneyhub.backend.helper.Constants.*;

@Service
public class EventService {

    private final UserService userService;

    private final EventRepository repository;

    public EventService(UserService userService, EventRepository repository) {
        this.userService = userService;
        this.repository = repository;
    }

    public Long delete(Long eventId, OAuth2User principal) {
        Event event = getEvent(eventId);
        Tournament tournament = event.getStage().getTournament();

        if (!userService.hasAnyRole(tournament.getId(), principal, HOST, ADMIN)) {
            throw new AppException(NO_PERMISSION, HttpStatus.FORBIDDEN);
        }
        if (event.isConcluded() || tournament.isConcluded()) {
            throw new AppException("Event or tournament is concluded!", HttpStatus.BAD_REQUEST);
        }
        repository.delete(event);
        return eventId;
    }

    public Event getEvent(Long id) {
        return repository
                .findById(id)
                .orElseThrow(() -> new AppException(
                        String.format("No event with ID: %d.", id), HttpStatus.NOT_FOUND));
    }
}
