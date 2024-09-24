package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("FROM Event e LEFT JOIN FETCH e.participants WHERE e.stage.id=:stageId")
    List<Event> getAllByStageId(@Param("stageId") Long stageId);
}
