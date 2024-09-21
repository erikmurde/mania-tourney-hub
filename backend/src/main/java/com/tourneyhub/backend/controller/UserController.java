package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.domain.AppUser;
import com.tourneyhub.backend.dto.user.UserDto;
import com.tourneyhub.backend.mapper.UserMapper;
import com.tourneyhub.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class UserController {

    private final UserRepository repository;

    private final UserMapper mapper;

    public UserController(UserRepository repository, UserMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @GetMapping("api/whoAmI")
    public UserDto whoAmI(@AuthenticationPrincipal OAuth2User principal) {
        AppUser user = repository
                .findByPlayerId(principal.getAttribute("id"))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return mapper.mapToDto(user);
    }
}
