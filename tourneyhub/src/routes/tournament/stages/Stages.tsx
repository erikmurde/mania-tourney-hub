import { Grid, Paper, Typography } from '@mui/material';
import StageList from '../../../components/tournament/stages/StageList';
import { IStageDto } from '../../../dto/stage/IStageDto';
import { useContext, useEffect, useState } from 'react';
import { StageService } from '../../../services/stageService';
import { AuthContext, UpdateContext } from '../../Root';
import { AuthService } from '../../../services/authService';
import StageSelectForm from '../../../components/tournament/stages/form/StageSelectForm';
import NoPermission from '../../NoPermission';
import { useTourney } from '../TournamentHeader';
import { QUALIFIER } from '../../../constants';

const Stages = () => {
    const { stageUpdate } = useContext(UpdateContext);
    const { user } = useContext(AuthContext);
    const { tourney } = useTourney();
    const [stages, setStages] = useState([] as IStageDto[]);

    const valid = user && new AuthService().isHost(user, tourney.id);

    useEffect(() => {
        if (valid) {
            new StageService()
                .getByTournamentId(tourney.id)
                .then(stages => setStages(stages));
        }
    }, [valid, stageUpdate]);

    if (!valid) {
        return <NoPermission/>
    }

    return (  
        <Paper elevation={2} sx={{ minHeight: 500, paddingBottom: 2 }}>
            <Grid container marginLeft={5} marginBottom={5}>
                <Grid item xs={12}>
                    <Typography variant='h2' 
                        height={100} 
                        fontSize={46} 
                        fontWeight={400} 
                        lineHeight={2}>
                        Stages
                    </Typography>
                </Grid>
                {!tourney.concluded && 
                <StageSelectForm 
                    hasQualifier={stages.some(stage => stage.stageType.name === QUALIFIER)}
                />}
            </Grid>
            <StageList stages={stages}/>
        </Paper>
    );
}

export default Stages;