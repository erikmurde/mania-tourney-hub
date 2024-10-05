package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.Beatmap;
import com.tourneyhub.backend.domain.BeatmapType;
import com.tourneyhub.backend.domain.Stage;
import com.tourneyhub.backend.domain.exception.AppException;
import com.tourneyhub.backend.dto.map.BeatmapDto;
import com.tourneyhub.backend.dto.map.osuApi.OsuBeatmapDto;
import com.tourneyhub.backend.dto.map.SubmittedBeatmapDto;
import com.tourneyhub.backend.helper.Constants;
import com.tourneyhub.backend.mapper.BeatmapMapper;
import com.tourneyhub.backend.repository.RepositoryUow;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BeatmapService {

    private final WebClient webClient;

    private final RepositoryUow uow;

    private final BeatmapMapper mapper;

    public BeatmapService(WebClient webClient, RepositoryUow uow, BeatmapMapper mapper) {
        this.webClient = webClient;
        this.uow = uow;
        this.mapper = mapper;
    }

    public List<BeatmapDto> getAllByStageId(Long stageId) {
        return uow.mapRepository
                .findAllByStageId(stageId).stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public List<BeatmapDto> getAllInMappoolByStageId(Long stageId) {
        Stage stage = uow.stageRepository
                .findById(stageId)
                .orElseThrow(() -> new AppException(
                        String.format("No stage with id %d", stageId), HttpStatus.NOT_FOUND));

        return !stage.isMappoolPublished()
                ? new ArrayList<>()
                : uow.mapRepository
                    .findAllInMappoolByStageId(stageId).stream()
                    .map(mapper::mapToDto)
                    .toList();
    }

    public void createSubmitted(SubmittedBeatmapDto mapDto, String suggestor) {
        BeatmapType mapType = fetchMapType(mapDto.getMapTypeId());
        Beatmap beatmap = mapper.mapOsuDtoToEntity(fetchBeatmapFromOsu(mapDto.getBeatmapId()));

        Long stageId = mapDto.getStageId();
        boolean isTb = mapType.getName().equals(Constants.TB);

        validateDuplicateTb(isTb, stageId);
        validateDuplicateBeatmapId(0L, stageId, beatmap.getBeatmapId());

        beatmap.setStage(uow.stageRepository.getReferenceById(stageId));
        beatmap.setBeatmapType(mapType);
        beatmap.setIndex(isTb ? 0 : mapDto.getIndex());
        beatmap.setComment(mapDto.getComment());
        beatmap.setSuggestor(suggestor);
        beatmap.setInMappool(false);
        uow.mapRepository.save(beatmap);
    }

    public void createUnsubmitted(BeatmapDto mapDto, String suggestor) {
        BeatmapType mapType = fetchMapType(mapDto.getMapTypeId());
        boolean isTb = mapType.getName().equals(Constants.TB);

        validateDuplicateTb(isTb, mapDto.getStageId());

        mapDto.setBeatmapId(0);
        mapDto.setInMappool(false);
        mapDto.setIndex(isTb ? 0 : mapDto.getIndex());
        mapDto.setSuggestor(suggestor);
        uow.mapRepository.save(mapper.mapToEntity(mapDto));
    }

    public void updateSubmitted(Long mapId, SubmittedBeatmapDto mapDto) {
        BeatmapType mapType = fetchMapType(mapDto.getMapTypeId());
        Beatmap beatmapFromOsu = mapper.mapOsuDtoToEntity(fetchBeatmapFromOsu(mapDto.getBeatmapId()));
        Beatmap beatmap = fetchMap(mapId);

        Long stageId = beatmap.getStage().getId();
        boolean isTb = mapType.getName().equals(Constants.TB);

        validateDuplicateTb(isTb, stageId);
        validateDuplicateBeatmapId(mapId, stageId, mapDto.getBeatmapId());

        beatmapFromOsu.setId(mapId);
        beatmapFromOsu.setStage(uow.stageRepository.getReferenceById(stageId));
        beatmapFromOsu.setSuggestor(beatmap.getSuggestor());
        beatmapFromOsu.setIndex(isTb ? 0 : mapDto.getIndex());
        beatmapFromOsu.setBeatmapType(mapType);
        beatmapFromOsu.setComment(mapDto.getComment());
        beatmapFromOsu.setInMappool(false);
        uow.mapRepository.save(beatmapFromOsu);
    }

    public void updateUnsubmitted(Long mapId, BeatmapDto mapDto) {
        if (mapDto.isInMappool()) {
            throw new AppException("Beatmap is in the mappool!", HttpStatus.BAD_REQUEST);
        }
        BeatmapType mapType = fetchMapType(mapDto.getMapTypeId());
        Long stageId = fetchMap(mapId).getStage().getId();
        boolean isTb = mapType.getName().equals(Constants.TB);

        validateDuplicateTb(isTb, stageId);
        validateDuplicateBeatmapId(mapId, stageId, mapDto.getBeatmapId());

        mapDto.setStageId(stageId);
        mapDto.setIndex(isTb ? 0 : mapDto.getIndex());

        Beatmap mapped = mapper.mapToEntity(mapDto);
        mapped.setId(mapId);
        uow.mapRepository.save(mapped);
    }

    public void updateInMappool(Long mapId, Boolean inMappool) {
        Beatmap beatmap = fetchMap(mapId);

        if (beatmap.getBeatmapId() == 0 && inMappool) {
            throw new AppException("Beatmap id is missing!", HttpStatus.BAD_REQUEST);
        }
        Optional<Beatmap> mapInMappool = uow.mapRepository.findCurrentMapInMappool(
                beatmap.getStage().getId(), beatmap.getBeatmapType().getId(), beatmap.getIndex()
        );
        mapInMappool.ifPresent(toRemove -> {
            toRemove.setInMappool(false);
            uow.mapRepository.save(toRemove);
        });
        beatmap.setInMappool(inMappool);
        uow.mapRepository.save(beatmap);
    }

    public void delete(Long mapId) {
        if (fetchMap(mapId).isInMappool()) {
            throw new AppException("Beatmap is in the mappool!", HttpStatus.BAD_REQUEST);
        }
        uow.mapRepository.deleteById(mapId);
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
            throw new AppException(
                    String.format("Could not find beatmap with id %d", beatmapId), HttpStatus.NOT_FOUND);
        }
    }

    private void validateDuplicateTb(boolean isTb, Long stageId) {
        if (isTb && uow.mapRepository.findTiebreakerInStage(stageId).isPresent()) {
            throw new AppException("Stage already has a tiebreaker!", HttpStatus.BAD_REQUEST);
        }
    }

    private void validateDuplicateBeatmapId(Long mapId, Long stageId, Integer beatmapId) {
        if (beatmapId == null || beatmapId == 0) {
            return;
        }
        Optional<Beatmap> duplicate = uow.mapRepository.findInStageByBeatmapId(stageId, beatmapId);

        if (duplicate.isPresent() && !duplicate.get().getId().equals(mapId)) {
            throw new AppException("Stage already has beatmap with same id!", HttpStatus.BAD_REQUEST);
        }
    }

    private Beatmap fetchMap(Long id) {
        return uow.mapRepository
                .findById(id)
                .orElseThrow(() -> new AppException(
                        String.format("No beatmap with id %d", id), HttpStatus.NOT_FOUND));
    }

    private BeatmapType fetchMapType(Long id) {
        return uow.mapTypeRepository
                .findById(id)
                .orElseThrow(() -> new AppException(
                        String.format("No beatmap type with id %d", id), HttpStatus.NOT_FOUND));
    }
}
