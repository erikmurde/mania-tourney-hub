package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StageRepository extends JpaRepository<Stage, Long> {

    @Query("FROM Stage s WHERE s.tournament.id=:tournamentId")
    List<Stage> findByTournamentId(@Param("tournamentId") Long tournamentId);
}
