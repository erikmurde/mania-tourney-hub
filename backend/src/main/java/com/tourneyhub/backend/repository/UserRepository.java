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

    @Query(
            "FROM AppUser u JOIN FETCH u.country LEFT JOIN FETCH u.stats LEFT JOIN u.roles r " +
            "WHERE r.tournament.id=:tournamentId AND r.role.name != 'player'"
    )
    List<AppUser> findAllStaffInTournament(@Param("tournamentId") Long tournamentId);

    @Query(
            "FROM AppUser u JOIN FETCH u.country LEFT JOIN FETCH u.stats s " +
            "WHERE s.tournament.id=:tournamentId"
    )
    List<AppUser> findAllPlayersInTournament(@Param("tournamentId") Long tournamentId);

    @Query(
            "FROM AppUser u LEFT JOIN TournamentRole r ON r.appUser.id=u.id " +
            "WHERE r.tournament.id=:tournamentId AND r.role.name IN :roles"
    )
    List<AppUser> findAllUsersInTournamentWithRoles(
            @Param("tournamentId") Long tournamentId,
            @Param("roles") List<String> roles
    );
}
