package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    Optional<Team> findByName(String name);

    @Query("FROM Team t LEFT JOIN TournamentPlayer p ON p.team.id=t.id WHERE p.tournament.id=:tournamentId")
    List<Team> findAllTeamsInTournament(@Param("tournamentId") Long tournamentId);
}
