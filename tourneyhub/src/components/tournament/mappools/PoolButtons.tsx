import { Edit, Public, Publish } from '@mui/icons-material';
import { Grid, Button } from '@mui/material';
import MapSelectForm from './form/MapSelectForm';
import ConfirmationDialog from '../dialog/ConfirmationDialog';
import { useContext } from 'react';
import { AuthContext, UpdateContext } from '../../../routes/Root';
import { HOST, ADMIN, MAPPER, MAPPOOLER, PLAYTESTER } from '../../../constants';
import { AuthService } from '../../../services/authService';
import { useParams } from 'react-router-dom';
import { StageService } from '../../../services/stageService';
import { IStageDto } from '../../../dto/stage/IStageDto';
import { useTourney } from '../../../routes/tournament/TournamentHeader';

interface IProps {
    stage: IStageDto | null,
    manage: boolean,
    setManage: (manage: boolean) => void
}

const PoolButtons = ({stage, manage, setManage}: IProps) => {
    const { mapPoolUpdate, setMapPoolUpdate } = useContext(UpdateContext);
    const { id } = useParams();
    const { tourney } = useTourney();
    const { user } = useContext(AuthContext);

    const publishMappool = async() => {
        if (!stage) {
            return;
        }
        stage.mappoolPublic = true;
        await new StageService().edit(stage.id, stage);
        setMapPoolUpdate(mapPoolUpdate + 1);
    }

    const isHost = user && id && new AuthService()
        .isHost(user, id);
        
    const canManage = user && user.roles
        .some(role => [HOST, ADMIN, MAPPER, MAPPOOLER, PLAYTESTER].includes(role.name));

    return (
        <>            
            {manage && 
            <>
            {!tourney.done &&
            <Grid item>
                <MapSelectForm/>
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
            {stage && !manage && !stage.mappoolPublic && isHost &&
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