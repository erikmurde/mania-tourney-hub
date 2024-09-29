package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.StaffRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StaffRequestRepository extends CrudRepository<StaffRequest, Long> {

    @Query("FROM StaffRequest r WHERE r.recipient.id IS NULL AND r.sender.id=:playerId")
    List<StaffRequest> getAllApplicationsOfUser(@Param("playerId") Long playerId);

    @Query("FROM StaffRequest r WHERE r.recipient.id=:playerId")
    List<StaffRequest> getAllInvitesOfUser(@Param("playerId") Long playerId);

    @Query("FROM StaffRequest r WHERE r.tournament.id=:tournamentId AND r.status.name = 'pending'")
    List<StaffRequest> getAllPendingRequestsInTournament(@Param("tournamentId") Long tournamentId);

    @Query(
            "FROM StaffRequest r " +
            "WHERE r.tournament.id=:tournamentId " +
            "AND r.recipient.id IS NULL " +
            "AND r.status.name = 'pending'"
    )
    List<StaffRequest> getAllPendingApplicationsInTournament(@Param("tournamentId") Long tournamentId);

    @Query(
            "FROM StaffRequest r " +
            "WHERE r.recipient.id=:recipientId AND r.tournament.id=:tournamentId AND r.role.id=:roleId " +
            "AND r.status.name = 'pending'"
    )
    Optional<StaffRequest> getPendingInvite(
            @Param("recipientId") Long recipientId,
            @Param("tournamentId") Long tournamentId,
            @Param("roleId") Long roleId
    );

    @Query(
            "FROM StaffRequest r " +
            "WHERE r.sender.id=:senderId AND r.recipient.id IS NULL " +
            "AND r.tournament.id=:tournamentId AND r.role.id=:roleId AND r.status.name = 'pending'"
    )
    Optional<StaffRequest> getPendingApplication(
            @Param("senderId") Long senderId,
            @Param("tournamentId") Long tournamentId,
            @Param("roleId") Long roleId
    );
}
