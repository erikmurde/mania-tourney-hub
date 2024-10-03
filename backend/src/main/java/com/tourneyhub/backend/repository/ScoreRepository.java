package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {

    @Query(
            "FROM Score s LEFT JOIN FETCH AppUser u ON s.appUserId=u.id " +
            "WHERE u.id IN :playerIds AND s.beatmap.id=:mapId"
    )
    List<Score> getTeamPlayerScoresOnMap(
            @Param("playerIds") List<Long> playerIds, @Param("mapId") Long mapId);
}
