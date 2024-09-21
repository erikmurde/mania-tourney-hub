package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MapRepository extends JpaRepository<Map, Long> {

    @Query("FROM Map m WHERE m.stage.id=:stageId")
    List<Map> findAllByStageId(@Param("stageId") Long stageId);

    @Query("FROM Map m WHERE  m.stage.id=:stageId AND m.inMappool = true")
    List<Map> findAllInMappoolByStageId(@Param("stageId") Long stageId);

    @Query(
            "FROM Map m WHERE m.stage.id=:stageId " +
            "AND m.mapType.id=:mapTypeId AND m.index=:index AND m.inMappool = true"
    )
    Optional<Map> findCurrentMapInMappool(
            @Param("stageId") Long stageId,
            @Param("mapTypeId") Long mapTypeId,
            @Param("index") Integer index
    );

    @Query("FROM Map m WHERE m.stage.id=:stageId AND m.beatmapId=:beatmapId")
    Optional<Map> findInStageByBeatmapId(@Param("stageId") Long stageId, @Param("beatmapId") Integer beatmapId);

    @Query("FROM Map m WHERE m.stage.id=:stageId AND m.mapType.name = 'TB'")
    Optional<Map> findTiebreakerInStage(@Param("stageId") Long stageId);
}
