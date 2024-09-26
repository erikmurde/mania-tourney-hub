package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.MapScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MapScoreRepository extends JpaRepository<MapScore, Long> {

    @Query(
            "FROM MapScore s LEFT JOIN FETCH AppUser u ON s.appUserId=u.id " +
            "WHERE u.id IN :playerIds AND s.map.id=:mapId"
    )
    List<MapScore> getTeamPlayerScoresOnMap(
            @Param("playerIds") List<Long> playerIds, @Param("mapId") Long mapId);
}
