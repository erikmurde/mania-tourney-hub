package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.AppUser;
import com.tourneyhub.backend.domain.Tournament;
import com.tourneyhub.backend.domain.TournamentRole;
import com.tourneyhub.backend.dto.tournament.SimpleTournamentDto;
import com.tourneyhub.backend.dto.tournament.TournamentCreateDto;
import com.tourneyhub.backend.dto.tournament.TournamentDto;
import com.tourneyhub.backend.dto.tournament.TournamentPublishDto;
import com.tourneyhub.backend.mapper.TournamentMapper;
import com.tourneyhub.backend.repository.TournamentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;

@Service
public class TournamentService {

    private final RoleService roleService;

    private final UserService userService;

    private final TournamentRoleService tournamentRoleService;

    private final TournamentPlayerService tournamentPlayerService;

    private final TournamentRepository tournamentRepository;

    private final TournamentMapper tournamentMapper;

    public TournamentService(
            RoleService roleService,
            UserService userService,
            TournamentPlayerService tournamentPlayerService,
            TournamentRepository tournamentRepository,
            TournamentRoleService tournamentRoleService,
            TournamentMapper tournamentMapper)
    {
        this.roleService = roleService;
        this.userService = userService;
        this.tournamentPlayerService = tournamentPlayerService;
        this.tournamentRepository = tournamentRepository;
        this.tournamentRoleService = tournamentRoleService;
        this.tournamentMapper = tournamentMapper;
    }

    public List<SimpleTournamentDto> getAll() {
        return tournamentRepository
                .findAll()
                .stream()
                .map(tournamentMapper::mapToSimpleDto).toList();
    }

    public TournamentDto getById(Long tournamentId) {
        return tournamentRepository
                .findById(tournamentId)
                .map(tournamentMapper::mapToDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Long create(TournamentCreateDto dto, OAuth2User principal) {
        dto.setRegsOpen(false);
        dto.setApplicationsOpen(false);
        validateTournament(dto);

        Tournament tournament = tournamentMapper.mapCreateToEntity(dto);
        tournamentRepository.save(tournament);

        updateHostRoles(dto.getHostRoles(), tournament, principal);
        return tournament.getId();
    }

    public Long update(Long tournamentId, TournamentCreateDto dto, OAuth2User principal) {
        validateTournament(dto);

        Tournament tournament = getTournament(tournamentId);

        tournamentMapper.mapUpdateToEntity(tournament, dto);
        tournamentRepository.save(tournament);

        updateHostRoles(dto.getHostRoles(), tournament, principal);
        return tournamentId;
    }

    public Long updateInformation(Long tournamentId, String information) {
        Tournament tournament = getTournament(tournamentId);

        tournament.setInformation(
                information.substring(1, information.length() - 1).replace("\\", "")
        );
        return tournamentRepository.save(tournament).getId();
    }

    public Long publish(Long tournamentId, TournamentPublishDto dto) {
        Tournament tournament = getTournament(tournamentId);

        if (isMissingDeadlines(dto)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        tournament.setRegsOpen(dto.isRegsOpen());
        tournament.setApplicationsOpen(dto.isApplicationsOpen());
        tournament.setRegDeadline(dto.getRegDeadline());
        tournament.setApplicationDeadline(dto.getApplicationDeadline());
        tournament.setPublished(true);

        return tournamentRepository.save(tournament).getId();
    }

    public Long makePrivate(Long tournamentId) {
        Tournament tournament = getTournament(tournamentId);

        if (!tournament.getPlayers().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        tournament.setRegsOpen(false);
        tournament.setApplicationsOpen(false);
        tournament.setPublished(false);

        return tournamentRepository.save(tournament).getId();
    }

    public void registerPlayer(Long tournamentId, OAuth2User principal) {
        Tournament tournament = getTournament(tournamentId);
        AppUser user = userService.getAppUser(principal);

        if (!tournament.isRegsOpen() || new Date().after(tournament.getRegDeadline())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        tournamentRoleService.create(roleService.getEntityByName("player"), tournament, user);
        tournamentPlayerService.createWithoutTeam(user, tournament, "registered");
    }

    public Tournament getTournament(Long tournamentId) {
        return tournamentRepository
                .findById(tournamentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    private void validateTournament(TournamentCreateDto dto) {
        List<String> roles = dto.getHostRoles();

        if (dto.isRegsOpen() && dto.getRegDeadline() == null
                || dto.isApplicationsOpen() && dto.getApplicationDeadline() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (!roles.contains("host") || roles.contains("player")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (dto.getMaxPlayerRank() < dto.getMinPlayerRank() || dto.getMaxTeamSize() < dto.getMinTeamSize()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    private void updateHostRoles(List<String> roles, Tournament tournament, OAuth2User principal) {
        AppUser user = userService.getAppUser(principal);

        for (TournamentRole role : user.getRoles()) {
            if (role.getTournamentId().equals(tournament.getId())) {
                tournamentRoleService.delete(role);
            }
        }
        for (String roleName : roles) {
            tournamentRoleService.create(roleService.getEntityByName(roleName), tournament, user);
        }
    }

    private boolean isMissingDeadlines(TournamentPublishDto dto) {
        return (dto.isRegsOpen() && dto.getRegDeadline() == null
                || dto.isApplicationsOpen() && dto.getApplicationDeadline() == null);
    }
}
