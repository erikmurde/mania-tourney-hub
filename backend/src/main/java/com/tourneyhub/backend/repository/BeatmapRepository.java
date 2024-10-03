package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.Beatmap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BeatmapRepository extends JpaRepository<Beatmap, Long> {

    @Query("FROM Beatmap m WHERE m.stage.id=:stageId")
    List<Beatmap> findAllByStageId(@Param("stageId") Long stageId);

    @Query("FROM Beatmap m WHERE  m.stage.id=:stageId AND m.inMappool=true")
    List<Beatmap> findAllInMappoolByStageId(@Param("stageId") Long stageId);

    @Query("FROM Beatmap m JOIN FETCH m.scores WHERE m.stage.id=:stageId AND m.inMappool=true")
    List<Beatmap> findAllInMappoolByStageIdWithScores(@Param("stageId") Long stageId);

    @Query(
            "FROM Beatmap m WHERE m.stage.id=:stageId " +
            "AND m.beatmapType.id=:mapTypeId AND m.index=:index AND m.inMappool = true"
    )
    Optional<Beatmap> findCurrentMapInMappool(
            @Param("stageId") Long stageId,
            @Param("mapTypeId") Long mapTypeId,
            @Param("index") Integer index
    );

    @Query("FROM Beatmap m WHERE m.stage.id=:stageId AND m.beatmapId=:beatmapId")
    Optional<Beatmap> findInStageByBeatmapId(@Param("stageId") Long stageId, @Param("beatmapId") Integer beatmapId);

    @Query("FROM Beatmap m WHERE m.stage.id=:stageId AND m.beatmapType.name='TB'")
    Optional<Beatmap> findTiebreakerInStage(@Param("stageId") Long stageId);
}
