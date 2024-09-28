package com.tourneyhub.backend.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class AppUser extends BaseEntityWithName implements UserDetails {

    private Integer playerId;

    private Integer rank;

    private String discordUsername;

    private Integer timezone;

    private String avatar;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Country country;

    @OneToMany(mappedBy = "appUser", fetch = FetchType.LAZY)
    private List<TournamentRole> roles = new ArrayList<>();

    @OneToMany(mappedBy = "appUser", fetch = FetchType.LAZY)
    private List<TournamentPlayer> stats = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }
}
