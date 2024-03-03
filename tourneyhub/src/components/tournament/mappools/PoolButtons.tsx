import { Edit, Public, Publish } from '@mui/icons-material';
import { Grid, Button } from '@mui/material';
import MapSelectForm from './form/MapSelectForm';
import ConfirmationDialog from '../dialog/ConfirmationDialog';
import { ISimpleStageDto } from '../../../dto/stage/ISimpleStageDto';
import { useContext } from 'react';
import { AuthContext } from '../../../routes/Root';
import { HOST, ADMIN, MAPPER, MAPPOOLER, PLAYTESTER } from '../../../constants';
import { AuthService } from '../../../services/authService';
import { useParams } from 'react-router-dom';

interface IProps {
    stage: ISimpleStageDto,
    manage: boolean,
    setManage: (manage: boolean) => void
}

const PoolButtons = ({stage, manage, setManage}: IProps) => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const isHost = user && id && new AuthService()
        .isHost(user, id);
        
    const canManage = user && user.roles
        .some(role => [HOST, ADMIN, MAPPER, MAPPOOLER, PLAYTESTER].includes(role.name));

    return (
        <>            
            {manage && 
            <>
            <Grid item>
                <MapSelectForm/>
            </Grid>
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
            {!manage && !stage.mappoolPublic && isHost &&
            <Grid item>
                <ConfirmationDialog
                    btnProps={{ startIcon: <Publish/>, title: 'Publish', sx: {width: 150}}}
                    title='Are you sure you wish to publish this mappool?'
                    actionTitle='Publish'
                    action={() => console.log('...publishing')}/>
            </Grid>}
        </>
    );
}

export default PoolButtons;