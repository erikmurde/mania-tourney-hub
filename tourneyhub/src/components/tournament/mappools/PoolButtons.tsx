import { Edit, Public, Publish } from '@mui/icons-material';
import { Grid, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import MapSelectForm from './form/MapSelectForm';
import ConfirmationDialog from '../dialog/ConfirmationDialog';
import { ISimpleStageDto } from '../../../dto/stage/ISimpleStageDto';

interface IProps {
    stage: ISimpleStageDto,
    manage?: boolean
}

const PoolButtons = ({stage, manage}: IProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    if (manage) {
        return (
            <>            
                <Grid item>
                    <MapSelectForm/>
                </Grid>
                <Grid item>
                    <Button sx={{ width: 150 }}
                        variant='contained' 
                        startIcon={<Public/>}
                        onClick={() => navigate(`../mappools${location.hash}`)}>
                        Public view
                    </Button>
                </Grid>
            </>
        );
    } else {
        return (
            <>
                <Grid item>
                    <Button sx={{ width: 150 }} 
                        variant='contained' 
                        startIcon={<Edit/>}
                        onClick={() => navigate(`../mappools/manage${location.hash}`)}>
                        Manage
                    </Button>
                </Grid>
                {stage.mappoolPublic 
                ?   <></>   
                :   <Grid item>
                    <ConfirmationDialog
                        btnProps={{ startIcon: <Publish/>, title: 'Publish', sx: {width: 150}}}
                        title='Are you sure you wish to publish this mappool?'
                        actionTitle='Publish'
                        action={() => console.log('...publishing')}/>
                    </Grid>}
            </>
        );
    }
}

export default PoolButtons;