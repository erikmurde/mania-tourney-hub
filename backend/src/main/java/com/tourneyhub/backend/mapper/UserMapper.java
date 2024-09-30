package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.AppUser;
import com.tourneyhub.backend.domain.TournamentPlayer;
import com.tourneyhub.backend.dto.user.SimpleUserDto;
import com.tourneyhub.backend.dto.user.UserDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserMapper {

    private final CountryMapper countryMapper;

    private final TournamentRoleMapper roleMapper;

    private final TournamentPlayerMapper statsMapper;

    public UserMapper(
            CountryMapper countryMapper, TournamentRoleMapper roleMapper, TournamentPlayerMapper statsMapper)
    {
        this.countryMapper = countryMapper;
        this.roleMapper = roleMapper;
        this.statsMapper = statsMapper;
    }

    public UserDto mapToDto(AppUser user) {
        return mapToDto(user, new ArrayList<>());
    }

    public UserDto mapToDto(AppUser user, List<TournamentPlayer> stats) {
        List<TournamentPlayer> userStats = stats.isEmpty() ? user.getStats() : stats;

        return new UserDto(
                user.getId(),
                user.getPlayerId(),
                user.getName(),
                user.getRank(),
                user.getDiscordUsername(),
                user.getTimezone(),
                user.getAvatar(),
                countryMapper.mapToDto(user.getCountry()),
                user.getRoles().stream().map(roleMapper::mapToDto).toList(),
                userStats.stream().map(statsMapper::mapToDto).toList()
        );
    }

    public SimpleUserDto mapToSimpleDto(AppUser user) {
        return mapToSimpleDto(user, null);
    }

    public SimpleUserDto mapToSimpleDto(AppUser user, Long tournamentId) {
        List<String> roles = tournamentId == null
                ? new ArrayList<>()
                : user
                    .getRoles()
                    .stream()
                    .filter(role -> role.getTournament().getId().equals(tournamentId))
                    .map(role -> role.getRole().getName())
                    .toList();

        return new SimpleUserDto(
                user.getId(),
                user.getPlayerId(),
                user.getName(),
                countryMapper.mapToDto(user.getCountry()),
                roles
        );
    }
}
