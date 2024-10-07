package com.tourneyhub.backend.service;

import com.tourneyhub.backend.domain.Stage;
import com.tourneyhub.backend.domain.exception.AppException;
import com.tourneyhub.backend.dto.StageDto;
import com.tourneyhub.backend.helper.Constants;
import com.tourneyhub.backend.mapper.StageMapper;
import com.tourneyhub.backend.repository.StageRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StageService {

    private final UserService userService;

    private final StageRepository repository;

    private final StageMapper mapper;

    public StageService(UserService userService, StageRepository repository, StageMapper mapper) {
        this.userService = userService;
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<StageDto> getByTournamentId(Long tournamentId) {
        return repository
                .findByTournamentId(tournamentId)
                .stream()
                .map(mapper::mapToDto)
                .toList();
    }

    public void create(StageDto stage) {
        if (qualifierInvalid(stage) && standardInvalid(stage)) {
            throw new AppException("Stage is invalid!", HttpStatus.BAD_REQUEST);
        }
        repository.save(mapper.mapToEntity(stage));
    }

    public void update(Long stageId, StageDto stageDto) {
        Stage stage = getStage(stageId);

        if (qualifierInvalid(stageDto) && standardInvalid(stageDto)) {
            throw new AppException("Stage is invalid!", HttpStatus.BAD_REQUEST);
        }
        Stage mapped = mapper.mapToEntity(stageDto);

        mapped.setId(stageId);
        mapped.setStageType(stage.getStageType());
        mapped.setTournament(stage.getTournament());

        repository.save(mapped);
    }

    public void delete(Long stageId, OAuth2User principal) {
        Stage stage = getStage(stageId);

        if (!userService.isHost(stage.getTournament().getId(), principal)) {
            throw new AppException(Constants.NO_PERMISSION, HttpStatus.FORBIDDEN);
        }
        if (stage.isMappoolPublished() || stage.isSchedulePublished() || stage.isStatsPublished()) {
            throw new AppException("Stage still has published components!", HttpStatus.BAD_REQUEST);
        }
        repository.deleteById(stageId);
    }

    private boolean qualifierInvalid(StageDto stage) {
        return (!stage.getStageType().getName().equals("qualifier") ||
                stage.getLobbySize() <= 0 || stage.getNumAdvancing() <= 0 || stage.getBestOf() != 0);
    }

    private boolean standardInvalid(StageDto stage) {
        return (!stage.getStageType().getName().equals("standard") ||
                stage.getLobbySize() != 0 || stage.getNumAdvancing() != 0 || stage.getBestOf() < 3);
    }

    private Stage getStage(Long id) {
        return repository
                .findById(id)
                .orElseThrow(() -> new AppException(
                        String.format("No stage with ID %d.", id), HttpStatus.NOT_FOUND));
    }
}
