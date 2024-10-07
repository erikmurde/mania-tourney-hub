package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByPlayerId(Integer playerId);

    Optional<AppUser> findByName(String name);

    @Query(
            "FROM AppUser u JOIN FETCH u.country LEFT JOIN FETCH u.stats LEFT JOIN u.roles r " +
            "WHERE r.tournament.id=:tournamentId AND r.role.name != 'player'"
    )
    List<AppUser> findAllStaffInTournament(@Param("tournamentId") Long tournamentId);

    @Query(
            "FROM AppUser u JOIN FETCH u.country LEFT JOIN FETCH u.roles LEFT JOIN u.stats s " +
            "WHERE s.tournament.id=:tournamentId"
    )
    List<AppUser> findAllPlayersInTournament(@Param("tournamentId") Long tournamentId);

    @Query(
            "FROM AppUser u JOIN FETCH u.country LEFT JOIN u.roles r " +
            "WHERE r.tournament.id=:tournamentId AND r.role.name IN :roles"
    )
    List<AppUser> findUsersInTournamentWithRoles(
            @Param("tournamentId") Long tournamentId,
            @Param("roles") List<String> roles
    );

    @Query("SELECT p.appUser FROM TournamentPlayer p JOIN FETCH p.appUser.roles WHERE p.team.id=:teamId")
    List<AppUser> findTeamPlayers(@Param("teamId") Long teamId);
}
