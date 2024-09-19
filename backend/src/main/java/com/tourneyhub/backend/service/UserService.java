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
        return processOAuth2User(super.loadUser(userRequest));
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

    private OAuth2User processOAuth2User(OAuth2User oAuth2User) {
        userRepository
                .findByPlayerId(oAuth2User.getAttribute("id"))
                .orElseGet(() -> createNewUser(oAuth2User));

        return oAuth2User;
    }

    private AppUser createNewUser(OAuth2User oAuth2User) {
        var user = new AppUser();

        Map<String, String> country = oAuth2User.getAttribute("country");
        Map<String, Integer> statistics = oAuth2User.getAttribute("statistics");

        if (country == null || statistics == null) {
            throw  new OAuth2AuthenticationException("Invalid user details!");
        }
        user.setPlayerId(oAuth2User.getAttribute("id"));
        user.setName(oAuth2User.getAttribute("username"));
        user.setAvatar(oAuth2User.getAttribute("avatar_url"));
        user.setRank(statistics.get("global_rank"));
        user.setDiscordUsername("");
        user.setTimezone(0);
        user.setCountry(countryRepository.findByIso2(country.get("code")));

        return userRepository.save(user);
    }
}
