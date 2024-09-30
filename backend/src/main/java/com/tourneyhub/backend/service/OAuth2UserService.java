package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.AppUser;
import com.tourneyhub.backend.repository.CountryRepository;
import com.tourneyhub.backend.repository.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    private final CountryRepository countryRepository;

    public OAuth2UserService(UserRepository userRepository, CountryRepository countryRepository) {
        this.userRepository = userRepository;
        this.countryRepository = countryRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        return processUser(super.loadUser(userRequest));
    }

    private OAuth2User processUser(OAuth2User principal) {
        AppUser appUser = userRepository
                .findByPlayerId(principal.getAttribute("id"))
                .map(user -> updateExistingUser(user, principal))
                .orElseGet(() -> createNewUser(principal));

        Map<String, Object> attributes = Map.of(
                "id", appUser.getId(),
                "username", appUser.getName()
        );
        return new DefaultOAuth2User(principal.getAuthorities(), attributes, "username");
    }

    private AppUser updateExistingUser(AppUser user, OAuth2User principal) {
        Map<String, Integer> statistics = principal.getAttribute("statistics");

        if (statistics == null) {
            throw new OAuth2AuthenticationException("Invalid user details!");
        }
        user.setName(principal.getAttribute("username"));
        user.setRank(statistics.get("global_rank"));
        return userRepository.save(user);
    }

    private AppUser createNewUser(OAuth2User principal) {
        var user = new AppUser();

        Map<String, String> country = principal.getAttribute("country");
        Map<String, Integer> statistics = principal.getAttribute("statistics");

        if (country == null || statistics == null) {
            throw new OAuth2AuthenticationException("Invalid user details!");
        }
        user.setPlayerId(principal.getAttribute("id"));
        user.setName(principal.getAttribute("username"));
        user.setAvatar(principal.getAttribute("avatar_url"));
        user.setRank(statistics.get("global_rank"));
        user.setDiscordUsername("");
        user.setTimezone(0);
        user.setCountry(countryRepository.findByIso2(country.get("code")));

        return userRepository.save(user);
    }
}
