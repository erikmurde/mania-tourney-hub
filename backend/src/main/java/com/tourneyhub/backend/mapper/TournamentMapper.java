package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.BaseEntityWithName;
import com.tourneyhub.backend.domain.Country;
import com.tourneyhub.backend.domain.Link;
import com.tourneyhub.backend.domain.Tournament;
import com.tourneyhub.backend.dto.LinkDto;
import com.tourneyhub.backend.dto.tournament.SimpleTournamentDto;
import com.tourneyhub.backend.dto.tournament.TournamentCreateDto;
import com.tourneyhub.backend.dto.tournament.TournamentDto;
import com.tourneyhub.backend.repository.CountryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.stream.Collectors;

@Component
public class TournamentMapper {

    private final CountryRepository countryRepository;

    public TournamentMapper(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    public TournamentDto mapToDto(Tournament tournament) {
        return new TournamentDto(
                tournament.getId(),
                tournament.getName(),
                tournament.getCode(),
                tournament.getDescription(),
                tournament.getBanner(),
                tournament.getKeyCount(),
                tournament.getMinTeamSize(),
                tournament.getMaxTeamSize(),
                tournament.getMinPlayerRank(),
                tournament.getMaxPlayerRank(),
                tournament.isConcluded(),
                tournament.isPublished(),
                tournament.isPlayersPublished(),
                tournament.isProtects(),
                tournament.isWarmups(),
                tournament.isRegsOpen(),
                tournament.isApplicationsOpen(),
                tournament.getRegDeadline(),
                tournament.getApplicationDeadline(),
                tournament.getInformation(),
                tournament.getRegMessage(),
                tournament.getCountries().stream()
                        .map(BaseEntityWithName::getName)
                        .toList(),
                tournament.getLinks().stream()
                        .map(link -> new LinkDto(link.getName(), link.getUrl()))
                        .toList()
        );
    }

    public SimpleTournamentDto mapToSimpleDto(Tournament tournament) {
        return new SimpleTournamentDto(
                tournament.getId(),
                tournament.getName(),
                tournament.getDescription(),
                tournament.getBanner(),
                tournament.getKeyCount(),
                tournament.getMinTeamSize(),
                tournament.getMaxTeamSize(),
                tournament.getMinPlayerRank(),
                tournament.getMaxPlayerRank(),
                tournament.isConcluded(),
                tournament.isPublished()
        );
    }

    public Tournament mapCreateToEntity(TournamentCreateDto dto) {
        var tournament = new Tournament();

        tournament.setInformation("");
        setGeneral(tournament, dto);
        setRestrictions(tournament, dto);

        return tournament;
    }

    public void mapUpdateToEntity(Tournament tournament, TournamentCreateDto dto) {
        setGeneral(tournament, dto);

        if (!tournament.isPublished()) {
            setRestrictions(tournament, dto);
        } else {
            tournament.setRegsOpen(dto.isRegsOpen());
            tournament.setApplicationsOpen(dto.isApplicationsOpen());
        }
    }

    private void setGeneral(Tournament tournament, TournamentCreateDto dto) {
        tournament.setName(dto.getName());
        tournament.setCode(dto.getCode());
        tournament.setDescription(dto.getDescription());
        tournament.setBanner(dto.getBanner());
        tournament.setRegDeadline(dto.getRegDeadline());
        tournament.setApplicationDeadline(dto.getApplicationDeadline());
        tournament.setRegMessage(dto.getRegMessage());
        tournament.setLinks(dto.getLinks().stream().map(this::getLink).collect(Collectors.toList()));
    }

    private void setRestrictions(Tournament tournament, TournamentCreateDto dto) {
        tournament.setKeyCount(dto.getKeyCount());
        tournament.setMinTeamSize(dto.getMinTeamSize());
        tournament.setMaxTeamSize(dto.getMaxTeamSize());
        tournament.setMinPlayerRank(dto.getMinPlayerRank());
        tournament.setMaxPlayerRank(dto.getMaxPlayerRank());
        tournament.setProtects(dto.isProtects());
        tournament.setWarmups(dto.isWarmups());
        tournament.setCountries(dto.getCountries().stream().map(this::getCountry).collect(Collectors.toList()));
    }

    private Country getCountry(String name) {
        return countryRepository
                .findByName(name)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    private Link getLink(LinkDto dto) {
        return new Link(dto.getName(), dto.getUrl());
    }
}
