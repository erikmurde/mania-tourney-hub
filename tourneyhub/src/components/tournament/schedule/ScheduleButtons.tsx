import { Publish } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { IStageDto } from '../../../dto/stage/IStageDto';
import { StageService } from '../../../services/stageService';
import { QUALIFIER } from '../../../constants';
import LobbyCreateForm from './form/LobbyCreateForm';
import MatchCreateForm from './form/MatchCreateForm';
import ConfirmationDialog from '../dialog/ConfirmationDialog';
import { useContext } from 'react';
import { UpdateContext } from '../../../routes/Root';

const ScheduleButtons = ({stage}: {stage: IStageDto}) => {
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);

    const publishSchedule = async() => {
        stage.schedulePublic = true;
        await new StageService().edit(stage.id, stage);
        setScheduleUpdate(scheduleUpdate + 1);
    }

    return (  
        <>
            <Grid item>
                {stage.stageType === QUALIFIER 
                ?   <LobbyCreateForm stageId={stage.id}/> 
                :   <MatchCreateForm stageId={stage.id}/>}
            </Grid>
            {!stage.schedulePublic &&
            <Grid item>
                <ConfirmationDialog 
                    btnProps={{ startIcon: <Publish />, title: 'Publish', sx: { width: 150 }}} 
                    title={'Are you sure you wish to publish this schedule?'} 
                    actionTitle={'Publish'} 
                    action={() => publishSchedule()}                
                />
            </Grid>}
        </>
    );
}

export default ScheduleButtons;