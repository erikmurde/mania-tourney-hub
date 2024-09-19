package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.TournamentRole;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TournamentRoleRepository extends CrudRepository<TournamentRole, Long> {

    @Query("FROM TournamentRole r WHERE r.appUser.playerId=:playerId AND r.tournament.id=:tournamentId")
    List<TournamentRole> getUserRolesInTournament(
            @Param("playerId") Integer playerId,
            @Param("tournamentId") Long tournamentId
    );
}
