package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.Tournament;
import com.tourneyhub.backend.dto.tournament.SimpleTournamentDto;
import com.tourneyhub.backend.dto.tournament.TournamentDto;
import com.tourneyhub.backend.dto.tournament.TournamentPublishDto;
import com.tourneyhub.backend.mapper.TournamentMapper;
import com.tourneyhub.backend.repository.TournamentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TournamentService {

    private final TournamentRepository repository;

    private final TournamentMapper mapper;

    public TournamentService(TournamentRepository repository, TournamentMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<SimpleTournamentDto> getAll() {
        return repository
                .findAll()
                .stream()
                .map(mapper::mapToSimpleDto).toList();
    }

    public TournamentDto getById(Long tournamentId) {
        return repository
                .findById(tournamentId)
                .map(mapper::mapToDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Long updateInformation(Long tournamentId, String information) {
        Tournament tournament = fetchTournament(tournamentId);

        tournament.setInformation(
                information.substring(1, information.length() - 1).replace("\\", "")
        );
        return repository.save(tournament).getId();
    }

    public Long publish(Long tournamentId, TournamentPublishDto dto) {
        Tournament tournament = fetchTournament(tournamentId);

        if (isMissingDeadlines(dto)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        tournament.setRegsOpen(dto.isRegsOpen());
        tournament.setApplicationsOpen(dto.isApplicationsOpen());
        tournament.setRegDeadline(dto.getRegDeadline());
        tournament.setApplicationDeadline(dto.getApplicationDeadline());
        tournament.setPublished(true);

        return repository.save(tournament).getId();
    }

    private boolean isMissingDeadlines(TournamentPublishDto dto) {
        return (
                dto.isRegsOpen() && dto.getRegDeadline() == null ||
                dto.isApplicationsOpen() && dto.getApplicationDeadline() == null
        );
    }

    private Tournament fetchTournament(Long tournamentId) {
        return repository
                .findById(tournamentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
