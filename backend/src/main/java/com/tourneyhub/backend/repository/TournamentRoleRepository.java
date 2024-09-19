package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.TournamentRole;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TournamentRoleRepository extends CrudRepository<TournamentRole, Long> {

    @Query("from TournamentRole r left join r.appUser u where u.playerId=:playerId and r.tournamentId=:tournamentId")
    List<TournamentRole> getUserRolesInTournament(
            @Param("playerId") Integer playerId,
            @Param("tournamentId") Long tournamentId
    );
}
