package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.TournamentRole;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TournamentRoleRepository extends CrudRepository<TournamentRole, Long> {

    @Query("FROM TournamentRole r WHERE r.appUser.playerId=:playerId AND r.tournament.id=:tournamentId")
    List<TournamentRole> getUserRolesInTournament(
            @Param("playerId") Integer playerId,
            @Param("tournamentId") Long tournamentId
    );

    @Query(
            "FROM TournamentRole r " +
            "WHERE r.appUser.id=:playerId AND r.tournament.id=:tournamentId AND r.role.id=:roleId"
    )
    Optional<TournamentRole> getUserRoleInTournament(
            @Param("playerId") Long playerId,
            @Param("tournamentId") Long tournamentId,
            @Param("roleId") Long roleId
    );
}
