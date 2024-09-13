import { Grid, Paper } from '@mui/material';
import SectionTitle from '../../../components/tournament/SectionTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { IStageDto } from '../../../dto/stage/IStageDto';
import { useContext, useEffect, useState } from 'react';
import { StageService } from '../../../services/stageService';
import StageTabs from '../../../components/tournament/StageTabs';
import ScheduleButtons from '../../../components/tournament/schedule/ScheduleButtons';
import { QUALIFIER } from '../../../constants';
import LobbyTable from '../../../components/tournament/schedule/table/lobby/LobbyTable';
import MatchTable from '../../../components/tournament/schedule/table/match/MatchTable';
import NoItems from '../../../components/tournament/NoItems';
import { AuthContext } from '../../Root';
import { AuthService } from '../../../services/authService';
import { useTourney } from '../TournamentHeader';

const Schedule = () => {
    const { id } = useParams();
    const { tourney } = useTourney();
    const { user } = useContext(AuthContext);
    const [stages, setStages] = useState([] as IStageDto[]);
    const [stageId, setStageId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            new StageService()
                .getAllTourney(id)
                .then(stages => setStages(stages))
                .then(() => {
                    const stageId = stages.length > 0 ? stages[0].id : '';

                    setStageId(stageId);
                    navigate(`#${stageId}`);
                });
        }
    }, [id]);

    let stage = stages.find(stage => 
        stage.id === stageId.toString()
    ) ?? {} as IStageDto;

    const isHost = id && user && new AuthService().isHost(user, id);

    return (  
        <Paper elevation={2} sx={{ minHeight: 500, paddingBottom: 2 }}>
            <Grid container>
                <SectionTitle title='Schedule'/>
                <StageTabs 
                    stages={stages} 
                    stageId={stageId} 
                    setStageId={setStageId}
                    buttons={
                        isHost && !tourney.done ? <ScheduleButtons stage={stage}/> : <></>
                    }/>
                <Grid item xs marginLeft={2} marginRight={2}>
                    {stage.schedulePublic || isHost
                    ?   <>
                            {stage.stageType === QUALIFIER 
                            ?   <LobbyTable stage={stage} showTeams={tourney.minTeamSize > 1}/> 
                            :   <MatchTable stage={stage}/>}
                        </>
                    :   <NoItems name={stage.stageType === QUALIFIER ? 'lobbies' : 'matches'}/>}
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Schedule;