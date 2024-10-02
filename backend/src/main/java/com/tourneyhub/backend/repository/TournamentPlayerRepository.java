package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.TournamentPlayer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TournamentPlayerRepository extends JpaRepository<TournamentPlayer, Long> {

    @Query("FROM TournamentPlayer p WHERE p.tournament.id=:tournamentId AND p.status.name!='disqualified'")
    List<TournamentPlayer> getAllValidTournamentStats(@Param("tournamentId") Long tournamentId);

    @Query("FROM TournamentPlayer p WHERE p.tournament.id=:tournamentId AND p.appUserId=:playerId")
    Optional<TournamentPlayer> getPlayerStatsInTournament(
            @Param("tournamentId") Long tournamentId,
            @Param("playerId") Long playerId
    );

    @Query("FROM TournamentPlayer p WHERE p.team.id=:teamId")
    List<TournamentPlayer> getTeamPlayerStats(@Param("teamId") Long teamId);

    @Query("SELECT count(p) FROM TournamentPlayer p WHERE p.tournament.id=:tournamentId AND p.status.name='active'")
    Integer getNumOfActivePlayers(@Param("tournamentId") Long tournamentId);

    @Query(
            "SELECT count(t) FROM TournamentPlayer p LEFT JOIN Team t ON p.team.id=t.id " +
            "WHERE p.tournament.id=:tournamentId AND p.status.name='active'"
    )
    Integer getNumOfActiveTeams(@Param("tournamentId") Long tournamentId);
}
