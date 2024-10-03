package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.Event;
import com.tourneyhub.backend.domain.Tournament;
import com.tourneyhub.backend.helper.Constants;
import com.tourneyhub.backend.repository.EventRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

        if (!userService.hasAnyRole(tournament.getId(), principal, Constants.HOST, Constants.ADMIN)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        if (event.isConcluded() || tournament.isConcluded()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        repository.delete(event);
        return eventId;
    }

    public Event getEvent(Long eventId) {
        return repository
                .findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
