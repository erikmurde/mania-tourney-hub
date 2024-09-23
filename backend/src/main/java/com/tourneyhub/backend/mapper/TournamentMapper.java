package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.BaseEntityWithName;
import com.tourneyhub.backend.domain.Tournament;
import com.tourneyhub.backend.dto.LinkDto;
import com.tourneyhub.backend.dto.tournament.SimpleTournamentDto;
import com.tourneyhub.backend.dto.tournament.TournamentDto;
import org.springframework.stereotype.Component;

@Component
public class TournamentMapper {

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
                tournament
                        .getCountries()
                        .stream()
                        .map(BaseEntityWithName::getName)
                        .toList(),
                tournament
                        .getLinks()
                        .stream()
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
}
