import { Edit, Public, Publish } from '@mui/icons-material';
import { Grid, Button } from '@mui/material';
import MapSelectForm from './form/MapSelectForm';
import ConfirmationDialog from '../dialog/ConfirmationDialog';
import { useContext } from 'react';
import { AuthContext, UpdateContext } from '../../../routes/Root';
import { HOST, ADMIN, MAPPER, MAPPOOLER, PLAYTESTER } from '../../../constants';
import { AuthService } from '../../../services/authService';
import { StageService } from '../../../services/stageService';
import { IStageDto } from '../../../dto/stage/IStageDto';
import { useTourney } from '../../../routes/tournament/TournamentHeader';
import { IMapDto } from '../../../dto/map/IMapDto';

interface IProps {
    stage: IStageDto | null,
    mappool: IMapDto[],
    manage: boolean,
    setManage: (manage: boolean) => void
}

const PoolButtons = ({stage, mappool, manage, setManage}: IProps) => {
    const { mapPoolUpdate, setMapPoolUpdate } = useContext(UpdateContext);
    const { tourney } = useTourney();
    const { user } = useContext(AuthContext);

    const publishMappool = async() => {
        if (!stage) {
            return;
        }
        stage.mappoolPublished = true;
        await new StageService().edit(stage.id, stage);
        setMapPoolUpdate(mapPoolUpdate + 1);
    }

    const isHost = user && tourney.id && new AuthService()
        .isHost(user, tourney.id);
        
    const canManage = user && user.roles
        .filter(tourneyRole => tourneyRole.tournamentId === tourney.id)
        .some(tourneyRole => [HOST, ADMIN, MAPPER, MAPPOOLER, PLAYTESTER].includes(tourneyRole.role));

    return (
        <>            
        {manage && stage &&
        <>
        {!tourney.concluded &&
        <Grid item>
            <MapSelectForm stageId={stage.id} mappool={mappool}/>
        </Grid>}
        <Grid item>
            <Button sx={{ width: 150 }}
                variant='contained' 
                startIcon={<Public/>}
                onClick={() => setManage(false)}>
                Public view
            </Button>
        </Grid>
        </>}
        {!manage && canManage &&
        <Grid item>
            <Button sx={{ width: 150 }} 
                variant='contained' 
                startIcon={<Edit/>}
                onClick={() => setManage(true)}>
                Manage
            </Button>
        </Grid>}
        {stage && !manage && !stage.mappoolPublished && isHost &&
        <Grid item>
            <ConfirmationDialog
                btnProps={{ startIcon: <Publish/>, title: 'Publish', sx: {width: 150}}}
                title='Are you sure you wish to publish this mappool?'
                actionTitle='Publish'
                action={() => publishMappool()}/>
        </Grid>}
        </>
    );
}

export default PoolButtons;