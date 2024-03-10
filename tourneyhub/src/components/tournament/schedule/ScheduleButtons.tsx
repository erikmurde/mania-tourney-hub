import { Publish } from '@mui/icons-material';
import { Grid, Button } from '@mui/material';
import { IStageDto } from '../../../dto/stage/IStageDto';
import { StageService } from '../../../services/stageService';
import { QUALIFIER } from '../../../constants';
import LobbyCreateForm from './form/LobbyCreateForm';
import MatchCreateForm from './form/MatchCreateForm';

const ScheduleButtons = ({stage}: {stage: IStageDto}) => {

    const publishSchedule = async() => {
        stage.schedulePublic = true;
        await new StageService().edit(stage.id, stage);
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
                <Button 
                    variant='contained' 
                    sx={{ width: 150 }}
                    startIcon={<Publish/>}
                    onClick={() => publishSchedule()}
                    >
                    Publish
                </Button>
            </Grid>}
        </>
    );
}
 
export default ScheduleButtons;