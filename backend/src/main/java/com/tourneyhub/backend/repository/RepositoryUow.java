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

    public final BeatmapRepository mapRepository;

    public final BeatmapTypeRepository mapTypeRepository;

    public final ScoreRepository scoreRepository;

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
            BeatmapRepository mapRepository,
            BeatmapTypeRepository mapTypeRepository,
            ScoreRepository scoreRepository,
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
        this.scoreRepository = scoreRepository;
        this.tournamentRepository = tournamentRepository;
        this.tournamentRoleRepository = tournamentRoleRepository;
        this.statsRepository = statsRepository;
        this.staffRequestRepository = staffRequestRepository;
    }
}
