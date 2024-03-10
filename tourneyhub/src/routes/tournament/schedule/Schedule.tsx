import { Grid, Paper } from '@mui/material';
import SectionTitle from '../../../components/tournament/SectionTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { IStageDto } from '../../../dto/stage/IStageDto';
import { useEffect, useState } from 'react';
import { StageService } from '../../../services/stageService';
import StageTabs from '../../../components/tournament/StageTabs';
import ScheduleButtons from '../../../components/tournament/schedule/ScheduleButtons';
import { QUALIFIER } from '../../../constants';
import LobbyTable from '../../../components/tournament/schedule/table/lobby/LobbyTable';
import MatchTable from '../../../components/tournament/schedule/table/match/MatchTable';

const Schedule = () => {
    const { id } = useParams();
    const [stages, setStages] = useState([] as IStageDto[]);
    const [stageId, setStageId] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            new StageService()
                .getAllTourney(id)
                .then(stages => setStages(stages))
                .then(() => {
                    const stageId = stages.length > 0 ? parseInt(stages[0].id) : 0;

                    setStageId(stageId);
                    navigate(`#${stageId}`);
                });
        }
    }, [id]);

    let stage = stages.find(stage => 
        stage.id === stageId.toString()
    ) ?? {} as IStageDto;

    return (  
        <Paper elevation={2} sx={{ minHeight: 500, paddingBottom: 2 }}>
            <Grid container>
                <SectionTitle title='Schedule'/>
                <StageTabs 
                    stages={stages} 
                    stageId={stageId} 
                    setStageId={setStageId}
                    buttons={
                        <ScheduleButtons stage={stage}/>
                    }/>
                <Grid item xs marginLeft={2} marginRight={2}>
                    <Paper elevation={6} sx={{ height: 1, paddingLeft: 1, paddingRight: 1 }}>
                        {stage.stageType === QUALIFIER 
                        ?   <LobbyTable stage={stage}/> 
                        :   <MatchTable stage={stage}/>}
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Schedule;