import { Grid, Paper } from '@mui/material';
import SectionTitle from '../../../components/tournament/SectionTitle';
import { IStageDto } from '../../../dto/stage/IStageDto';
import { useContext, useEffect, useState } from 'react';
import { StageService } from '../../../services/stageService';
import StageTabs from '../../../components/tournament/StageTabs';
import ScheduleButtons from '../../../components/tournament/schedule/ScheduleButtons';
import { ADMIN, HOST, QUALIFIER, REFEREE } from '../../../constants';
import LobbyTable from '../../../components/tournament/schedule/table/lobby/LobbyTable';
import MatchTable from '../../../components/tournament/schedule/table/match/MatchTable';
import { AuthContext } from '../../Root';
import { AuthService } from '../../../services/authService';
import { useTourney } from '../TournamentHeader';

const Schedule = () => {
    const { tourney } = useTourney();
    const { user } = useContext(AuthContext);
    const [stages, setStages] = useState([] as IStageDto[]);
    const [stageId, setStageId] = useState(null as string | null);

    const service = new AuthService();

    useEffect(() => {
        new StageService()
            .getByTournamentId(tourney.id)
            .then(stages => {
                setStages(stages);
                setStageId(stages.length > 0 ? stages[0].id : null);
            });
    }, [tourney.id]);

    let stage = stages.find(stage => stage.id === stageId);

    const hasViewRights = service.hasRoles(user, tourney.id, HOST, ADMIN, REFEREE);
    const hasEditRights = service.hasRoles(user, tourney.id, HOST, ADMIN);
    const canView = stage !== undefined && (stage.schedulePublished || hasViewRights);

    return (  
        <Paper elevation={2} sx={{ minHeight: 800, paddingBottom: 2 }}>
            <Grid container>
                <SectionTitle title='Schedule'/>
                {stage &&
                <>
                <StageTabs 
                    stages={stages} 
                    stageId={stageId} 
                    setStageId={setStageId}
                    buttons={hasEditRights && !tourney.concluded ? <ScheduleButtons stage={stage}/> : <></>}
                />
                <Grid item xs marginLeft={2} marginRight={2}>
                    {stage.stageType.name === QUALIFIER 
                    ?   <LobbyTable stage={stage} showTeams={tourney.minTeamSize > 1} canView={canView}/> 
                    :   <MatchTable stage={stage} canView={canView}/>}
                </Grid>
                </>}
            </Grid>
        </Paper>
    );
}

export default Schedule;