package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.StaffRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffRequestRepository extends CrudRepository<StaffRequest, Long> {

    @Query("FROM StaffRequest r WHERE r.recipient.id IS NULL AND r.sender.playerId=:playerId")
    List<StaffRequest> getAllUser(@Param("playerId") Integer playerId);

    @Query(
            "FROM StaffRequest r " +
            "WHERE r.tournament.id=:tournamentId " +
            "AND r.recipient.id IS NULL " +
            "AND r.status.name = 'pending'"
    )
    List<StaffRequest> getAllPendingInTournament(@Param("tournamentId") Long tournamentId);
}
