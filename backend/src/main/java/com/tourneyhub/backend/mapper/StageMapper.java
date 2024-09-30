package com.tourneyhub.backend.mapper;

import com.tourneyhub.backend.domain.Stage;
import com.tourneyhub.backend.dto.StageDto;
import com.tourneyhub.backend.repository.TournamentRepository;
import org.springframework.stereotype.Component;

@Component
public class StageMapper {

    private final StageTypeMapper stageTypeMapper;

    private final TournamentRepository tournamentRepository;

    public StageMapper(StageTypeMapper stageTypeMapper, TournamentRepository tournamentRepository) {
        this.stageTypeMapper = stageTypeMapper;
        this.tournamentRepository = tournamentRepository;
    }

    public StageDto mapToDto(Stage stage) {
        return new StageDto(
                stage.getId(),
                stage.getTournament().getId(),
                stage.getName(),
                stage.getBestOf(),
                stage.getLobbySize(),
                stage.getNumAdvancing(),
                stage.getSchedulingDeadline(),
                stageTypeMapper.mapToDto(stage.getStageType()),
                stage.isMappoolPublished(),
                stage.isSchedulePublished(),
                stage.isStatsPublished()
        );
    }

    public Stage mapToEntity(StageDto stageDto) {
        var stage = new Stage();

        stage.setName(stageDto.getName());
        stage.setBestOf(stageDto.getBestOf());
        stage.setLobbySize(stageDto.getLobbySize());
        stage.setNumAdvancing(stageDto.getNumAdvancing());
        stage.setSchedulingDeadline(stageDto.getSchedulingDeadline());
        stage.setMappoolPublished(stageDto.isMappoolPublished());
        stage.setSchedulePublished(stageDto.isSchedulePublished());
        stage.setStatsPublished(stageDto.isStatsPublished());
        stage.setTournament(tournamentRepository.getReferenceById(stageDto.getTournamentId()));
        stage.setStageType(stageTypeMapper.mapToEntity(stageDto.getStageType()));

        return stage;
    }
}
