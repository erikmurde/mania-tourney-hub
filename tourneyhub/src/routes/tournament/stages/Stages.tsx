import { Grid, Paper } from '@mui/material';
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
import NoItems from '../../../components/tournament/NoItems';
import SectionTitle from '../../../components/tournament/SectionTitle';

const Stages = () => {
    const { stageUpdate } = useContext(UpdateContext);
    const { user } = useContext(AuthContext);
    const { tourney } = useTourney();

    const [stages, setStages] = useState([] as IStageDto[]);
    const [loading, setLoading] = useState(true);

    const valid = user && new AuthService().isHost(user, tourney.id);

    useEffect(() => {
        if (valid) {
            new StageService()
                .getByTournamentId(tourney.id)
                .then(stages => setStages(stages))
                .finally(() => setLoading(false));
        }
    }, [valid, stageUpdate]);

    if (!valid) {
        return <NoPermission/>
    }

    return (  
        <Paper elevation={2} sx={{ minHeight: 800, paddingBottom: 2 }}>
            <Grid container alignItems='center'>
                <SectionTitle title='Stages' xsAuto/>
                <Grid item xs textAlign='end' marginRight={5}>
                    {!tourney.concluded && 
                    <StageSelectForm 
                        hasQualifier={stages.some(stage => stage.stageType.name === QUALIFIER)}
                    />}
                </Grid>
            </Grid>
            <NoItems name='stages' loading={loading} display={stages.length === 0}/>
            <StageList stages={stages}/>
        </Paper>
    );
}

export default Stages;