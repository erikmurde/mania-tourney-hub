package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.AppUser;
import com.tourneyhub.backend.dto.SimpleUserDto;
import com.tourneyhub.backend.dto.UserDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class UserMapper {

    private final CountryMapper countryMapper;

    private final TournamentRoleMapper roleMapper;

    public UserMapper(CountryMapper countryMapper, TournamentRoleMapper roleMapper) {
        this.countryMapper = countryMapper;
        this.roleMapper = roleMapper;
    }

    public UserDto mapToDto(AppUser user) {
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
                new ArrayList<>()
        );
    }

    public SimpleUserDto mapToSimpleDto(AppUser user) {
        return new SimpleUserDto(
                user.getPlayerId(),
                user.getName(),
                countryMapper.mapToDto(user.getCountry())
        );
    }
}
