package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.Map;
import com.tourneyhub.backend.domain.MapType;
import com.tourneyhub.backend.dto.map.MapDto;
import com.tourneyhub.backend.dto.map.osuApi.OsuBeatmapDto;
import com.tourneyhub.backend.dto.map.osuApi.OsuBeatmapSetDto;
import com.tourneyhub.backend.repository.MapTypeRepository;
import com.tourneyhub.backend.repository.StageRepository;
import org.springframework.stereotype.Component;

@Component
public class MapMapper {

    private final MapTypeRepository mapTypeRepository;

    private final StageRepository stageRepository;

    public MapMapper(MapTypeRepository mapTypeRepository, StageRepository stageRepository) {
        this.mapTypeRepository = mapTypeRepository;
        this.stageRepository = stageRepository;
    }

    public MapDto mapToDto(Map map) {
        MapType mapType = map.getMapType();

        return new MapDto(
                map.getId(),
                map.getStage().getId(),
                mapType.getId(),
                map.getBeatmapId(),
                map.getTitle(),
                map.getDiff(),
                map.getArtist(),
                map.getMapper(),
                map.getSuggestor(),
                map.getCover(),
                map.getDownload(),
                map.getSr(),
                map.getBpm(),
                map.getHp(),
                map.getOd(),
                map.getDrainTime(),
                map.isInMappool(),
                mapType.getName(),
                map.getIndex(),
                map.getComment(),
                map.getSongPreview()
        );
    }

    public Map mapToEntity(MapDto mapDto) {
        Map map = new Map();

        map.setBeatmapId(mapDto.getBeatmapId());
        map.setTitle(mapDto.getTitle());
        map.setDiff(mapDto.getDiff());
        map.setArtist(mapDto.getArtist());
        map.setMapper(mapDto.getMapper());
        map.setSuggestor(mapDto.getSuggestor());
        map.setCover(mapDto.getCover());
        map.setDownload(mapDto.getDownload());
        map.setSr(mapDto.getSr());
        map.setBpm(mapDto.getBpm());
        map.setHp(mapDto.getHp());
        map.setOd(mapDto.getOd());
        map.setDrainTime(mapDto.getDrainTime());
        map.setInMappool(mapDto.isInMappool());
        map.setIndex(mapDto.getIndex());
        map.setComment(mapDto.getComment());
        map.setSongPreview(mapDto.getSongPreview());
        map.setMapType(mapTypeRepository.getReferenceById(mapDto.getMapTypeId()));
        map.setStage(stageRepository.getReferenceById(mapDto.getStageId()));

        return map;
    }

    public Map mapOsuDtoToEntity(OsuBeatmapDto mapDto) {
        OsuBeatmapSetDto beatmapSet = mapDto.getBeatmapset();
        Map map = new Map();

        map.setBeatmapId(mapDto.getId());
        map.setTitle(beatmapSet.getTitle());
        map.setDiff(mapDto.getVersion().replaceAll("\\[\\dK] ", ""));
        map.setArtist(beatmapSet.getArtist());
        map.setMapper(beatmapSet.getCreator());
        map.setCover(beatmapSet.getCovers().getCard());
        map.setDownload(mapDto.getUrl());
        map.setSr(mapDto.getDifficulty_rating());
        map.setBpm(mapDto.getBpm());
        map.setHp(mapDto.getDrain());
        map.setOd(mapDto.getAccuracy());
        map.setDrainTime(mapDto.getTotal_length());
        map.setSongPreview(beatmapSet.getPreview_url());

        return map;
    }
}
