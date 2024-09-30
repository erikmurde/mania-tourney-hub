package com.tourneyhub.backend.repository;

import org.springframework.stereotype.Component;

@Component
public class RepositoryUow {

    public final UserRepository userRepository;

    public final RoleRepository roleRepository;

    public final StatusRepository statusRepository;

    public final TeamRepository teamRepository;

    public final EventRepository eventRepository;

    public final StageRepository stageRepository;

    public final MapRepository mapRepository;

    public final MapTypeRepository mapTypeRepository;

    public final MapScoreRepository mapScoreRepository;

    public final TournamentRepository tournamentRepository;

    public final TournamentRoleRepository tournamentRoleRepository;

    public final TournamentPlayerRepository statsRepository;

    public final StaffRequestRepository staffRequestRepository;

    public RepositoryUow(
            UserRepository userRepository,
            RoleRepository roleRepository,
            StatusRepository statusRepository,
            TeamRepository teamRepository,
            EventRepository eventRepository,
            StageRepository stageRepository,
            MapRepository mapRepository,
            MapTypeRepository mapTypeRepository,
            MapScoreRepository mapScoreRepository,
            TournamentRepository tournamentRepository,
            TournamentRoleRepository tournamentRoleRepository,
            TournamentPlayerRepository statsRepository,
            StaffRequestRepository staffRequestRepository)
    {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.statusRepository = statusRepository;
        this.teamRepository = teamRepository;
        this.eventRepository = eventRepository;
        this.stageRepository = stageRepository;
        this.mapRepository = mapRepository;
        this.mapTypeRepository = mapTypeRepository;
        this.mapScoreRepository = mapScoreRepository;
        this.tournamentRepository = tournamentRepository;
        this.tournamentRoleRepository = tournamentRoleRepository;
        this.statsRepository = statsRepository;
        this.staffRequestRepository = staffRequestRepository;
    }
}
