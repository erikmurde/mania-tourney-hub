package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.AppUser;
import com.tourneyhub.backend.helper.Constants;
import com.tourneyhub.backend.repository.TournamentRoleRepository;
import com.tourneyhub.backend.repository.UserRepository;
import com.tourneyhub.backend.repository.CountryRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    private final CountryRepository countryRepository;

    private final TournamentRoleRepository tournamentRoleRepository;

    public UserService(
            UserRepository userRepository,
            CountryRepository countryRepository,
            TournamentRoleRepository tournamentRoleRepository
    ) {
        this.userRepository = userRepository;
        this.countryRepository = countryRepository;
        this.tournamentRoleRepository = tournamentRoleRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        return processUser(super.loadUser(userRequest));
    }

    private OAuth2User processUser(OAuth2User principal) {
        userRepository
                .findByPlayerId(principal.getAttribute("id"))
                .map(user -> updateExistingUser(user, principal))
                .orElseGet(() -> createNewUser(principal));

        return principal;
    }

    private AppUser updateExistingUser(AppUser user, OAuth2User principal) {
        Map<String, Integer> statistics = principal.getAttribute("statistics");

        if (statistics == null) {
            throw new OAuth2AuthenticationException("Invalid user details!");
        }
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

    public List<String> getTournamentRoles(Long tournamentId, OAuth2User principal) {
        if (principal == null) {
            return new ArrayList<>();
        }
        return tournamentRoleRepository
                .getUserRolesInTournament(principal.getAttribute("id"), tournamentId)
                .stream()
                .map(role -> role.getRole().getName())
                .toList();
    }

    public boolean isHost(Long tournamentId, OAuth2User principal) {
        return getTournamentRoles(tournamentId, principal).contains(Constants.HOST);
    }
}
