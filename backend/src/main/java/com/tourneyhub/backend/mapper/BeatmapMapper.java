package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.Beatmap;
import com.tourneyhub.backend.domain.BeatmapType;
import com.tourneyhub.backend.dto.map.BeatmapDto;
import com.tourneyhub.backend.dto.map.osuApi.OsuBeatmapDto;
import com.tourneyhub.backend.dto.map.osuApi.OsuBeatmapSetDto;
import com.tourneyhub.backend.repository.BeatmapTypeRepository;
import com.tourneyhub.backend.repository.StageRepository;
import org.springframework.stereotype.Component;

@Component
public class BeatmapMapper {

    private final BeatmapTypeRepository mapTypeRepository;

    private final StageRepository stageRepository;

    public BeatmapMapper(BeatmapTypeRepository mapTypeRepository, StageRepository stageRepository) {
        this.mapTypeRepository = mapTypeRepository;
        this.stageRepository = stageRepository;
    }

    public BeatmapDto mapToDto(Beatmap beatmap) {
        BeatmapType mapType = beatmap.getBeatmapType();

        return new BeatmapDto(
                beatmap.getId(),
                beatmap.getStage().getId(),
                mapType.getId(),
                beatmap.getBeatmapId(),
                beatmap.getTitle(),
                beatmap.getDiff(),
                beatmap.getArtist(),
                beatmap.getMapper(),
                beatmap.getSuggestor(),
                beatmap.getCover(),
                beatmap.getDownload(),
                beatmap.getSr(),
                beatmap.getBpm(),
                beatmap.getHp(),
                beatmap.getOd(),
                beatmap.getDrainTime(),
                beatmap.isInMappool(),
                mapType.getName(),
                beatmap.getIndex(),
                beatmap.getComment(),
                beatmap.getSongPreview()
        );
    }

    public Beatmap mapToEntity(BeatmapDto mapDto) {
        Beatmap beatmap = new Beatmap();

        beatmap.setBeatmapId(mapDto.getBeatmapId());
        beatmap.setTitle(mapDto.getTitle());
        beatmap.setDiff(mapDto.getDiff());
        beatmap.setArtist(mapDto.getArtist());
        beatmap.setMapper(mapDto.getMapper());
        beatmap.setSuggestor(mapDto.getSuggestor());
        beatmap.setCover(mapDto.getCover());
        beatmap.setDownload(mapDto.getDownload());
        beatmap.setSr(mapDto.getSr());
        beatmap.setBpm(mapDto.getBpm());
        beatmap.setHp(mapDto.getHp());
        beatmap.setOd(mapDto.getOd());
        beatmap.setDrainTime(mapDto.getDrainTime());
        beatmap.setInMappool(mapDto.isInMappool());
        beatmap.setIndex(mapDto.getIndex());
        beatmap.setComment(mapDto.getComment());
        beatmap.setSongPreview(mapDto.getSongPreview());
        beatmap.setBeatmapType(mapTypeRepository.getReferenceById(mapDto.getMapTypeId()));
        beatmap.setStage(stageRepository.getReferenceById(mapDto.getStageId()));

        return beatmap;
    }

    public Beatmap mapOsuDtoToEntity(OsuBeatmapDto mapDto) {
        OsuBeatmapSetDto beatmapSet = mapDto.getBeatmapset();
        Beatmap beatmap = new Beatmap();

        beatmap.setBeatmapId(mapDto.getId());
        beatmap.setTitle(beatmapSet.getTitle());
        beatmap.setDiff(mapDto.getVersion().replaceAll("\\[\\dK] ", ""));
        beatmap.setArtist(beatmapSet.getArtist());
        beatmap.setMapper(beatmapSet.getCreator());
        beatmap.setCover(beatmapSet.getCovers().getCard());
        beatmap.setDownload(mapDto.getUrl());
        beatmap.setSr(mapDto.getDifficulty_rating());
        beatmap.setBpm(mapDto.getBpm());
        beatmap.setHp(mapDto.getDrain());
        beatmap.setOd(mapDto.getAccuracy());
        beatmap.setDrainTime(mapDto.getTotal_length());
        beatmap.setSongPreview(beatmapSet.getPreview_url());

        return beatmap;
    }
}
