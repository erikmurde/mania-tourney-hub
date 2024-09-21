package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.Map;
import com.tourneyhub.backend.domain.MapType;
import com.tourneyhub.backend.dto.map.MapDto;
import com.tourneyhub.backend.dto.map.osuApi.OsuBeatmapDto;
import com.tourneyhub.backend.dto.map.SubmittedMapDto;
import com.tourneyhub.backend.mapper.MapMapper;
import com.tourneyhub.backend.repository.MapRepository;
import com.tourneyhub.backend.repository.MapTypeRepository;
import com.tourneyhub.backend.repository.StageRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class MapService {

    private final WebClient webClient;

    private final MapTypeRepository mapTypeRepository;

    private final MapRepository mapRepository;

    private final StageRepository stageRepository;

    private final MapMapper mapper;

    public MapService(
            WebClient webClient,
            MapTypeRepository mapTypeRepository,
            MapRepository mapRepository,
            StageRepository stageRepository,
            MapMapper mapper)
    {
        this.webClient = webClient;
        this.mapTypeRepository = mapTypeRepository;
        this.mapRepository = mapRepository;
        this.stageRepository = stageRepository;
        this.mapper = mapper;
    }

    public List<MapDto> getAllByStageId(Long stageId) {
        return mapRepository
                .findAllByStageId(stageId)
                .stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public List<MapDto> getAllInMappoolByStageId(Long stageId) {
        return mapRepository
                .findAllInMappoolByStageId(stageId)
                .stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public void createSubmitted(SubmittedMapDto mapDto, String suggestor) {
        MapType mapType = fetchMapType(mapDto.getMapTypeId());
        Map map = mapper.mapOsuDtoToEntity(fetchBeatmapFromOsu(mapDto.getBeatmapId()));

        Long stageId = mapDto.getStageId();
        boolean isTb = mapType.getName().equals("TB");

        validateDuplicateTb(isTb, stageId);
        validateDuplicateBeatmapId(0L, stageId, map.getBeatmapId());

        map.setStage(stageRepository.getReferenceById(stageId));
        map.setMapType(mapType);
        map.setIndex(isTb ? 0 : mapDto.getIndex());
        map.setComment(mapDto.getComment());
        map.setSuggestor(suggestor);
        map.setInMappool(false);
        mapRepository.save(map);
    }

    public void createUnsubmitted(MapDto mapDto, String suggestor) {
        MapType mapType = fetchMapType(mapDto.getMapTypeId());
        boolean isTb = mapType.getName().equals("TB");

        validateDuplicateTb(isTb, mapDto.getStageId());

        mapDto.setBeatmapId(0);
        mapDto.setInMappool(false);
        mapDto.setIndex(isTb ? 0 : mapDto.getIndex());
        mapDto.setSuggestor(suggestor);
        mapRepository.save(mapper.mapToEntity(mapDto));
    }

    public void updateSubmitted(Long mapId, SubmittedMapDto mapDto) {
        MapType mapType = fetchMapType(mapDto.getMapTypeId());
        Map mapFromOsu = mapper.mapOsuDtoToEntity(fetchBeatmapFromOsu(mapDto.getBeatmapId()));
        Map map = fetchMap(mapId);

        Long stageId = map.getStage().getId();
        boolean isTb = mapType.getName().equals("TB");

        validateDuplicateTb(isTb, stageId);
        validateDuplicateBeatmapId(mapId, stageId, mapDto.getBeatmapId());

        mapFromOsu.setId(mapId);
        mapFromOsu.setStage(stageRepository.getReferenceById(stageId));
        mapFromOsu.setSuggestor(map.getSuggestor());
        mapFromOsu.setIndex(isTb ? 0 : mapDto.getIndex());
        mapFromOsu.setMapType(mapType);
        mapFromOsu.setComment(mapDto.getComment());
        mapFromOsu.setInMappool(false);
        mapRepository.save(mapFromOsu);
    }

    public void updateUnsubmitted(Long mapId, MapDto mapDto) {
        if (mapDto.isInMappool()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        MapType mapType = fetchMapType(mapDto.getMapTypeId());
        Long stageId = fetchMap(mapId).getStage().getId();
        boolean isTb = mapType.getName().equals("TB");

        validateDuplicateTb(isTb, stageId);
        validateDuplicateBeatmapId(mapId, stageId, mapDto.getBeatmapId());

        mapDto.setStageId(stageId);
        mapDto.setIndex(isTb ? 0 : mapDto.getIndex());

        Map mapped = mapper.mapToEntity(mapDto);
        mapped.setId(mapId);
        mapRepository.save(mapped);
    }

    public void updateInMappool(Long mapId, Boolean inMappool) {
        Map map = fetchMap(mapId);

        if (map.getBeatmapId() == 0 && inMappool) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Optional<Map> mapInMappool = mapRepository.findCurrentMapInMappool(
                map.getStage().getId(), map.getMapType().getId(), map.getIndex()
        );
        mapInMappool.ifPresent(toRemove -> {
            toRemove.setInMappool(false);
            mapRepository.save(toRemove);
        });
        map.setInMappool(inMappool);
        mapRepository.save(map);
    }

    public void delete(Long mapId) {
        if (fetchMap(mapId).isInMappool()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        mapRepository.deleteById(mapId);
    }

    private OsuBeatmapDto fetchBeatmapFromOsu(@PathVariable("beatmapId") Integer beatmapId) {
        try {
            return webClient
                    .get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/beatmaps/{beatmapId}")
                            .build(beatmapId)
                    )
                    .retrieve()
                    .bodyToMono(OsuBeatmapDto.class)
                    .block();

        } catch (WebClientResponseException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    private void validateDuplicateTb(boolean isTb, Long stageId) {
        if (isTb && mapRepository.findTiebreakerInStage(stageId).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    private void validateDuplicateBeatmapId(Long mapId, Long stageId, Integer beatmapId) {
        Optional<Map> duplicate = mapRepository.findInStageByBeatmapId(stageId, beatmapId);

        if (beatmapId > 0 && duplicate.isPresent() && !duplicate.get().getId().equals(mapId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    private Map fetchMap(Long id) {
        return mapRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    private MapType fetchMapType(Long id) {
        return mapTypeRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
