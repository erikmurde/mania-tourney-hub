import { Delete } from '@mui/icons-material';
import { Card, Grid, Typography, CardActions, Box } from '@mui/material';
import { IStageDto } from '../../../../dto/stage/IStageDto';
import VisibilityMarker from './VisibilityMarker';
import { StyledCardContent } from '../../../styled/StyledCardContent';
import StageInfo from './StageInfo';
import ConfirmationDialog from '../../dialog/ConfirmationDialog';
import StageEditForm from '../form/StageEditForm';
import { useContext } from 'react';
import { UpdateContext } from '../../../../routes/Root';
import { StageService } from '../../../../services/stageService';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';

const StageCard = ({stage}: {stage: IStageDto}) => {
    const { tourney } = useTourney();
    const { stageUpdate, setStageUpdate } = useContext(UpdateContext);

    const onDelete = async() => {
        await new StageService().delete(stage.id);
        setStageUpdate(stageUpdate + 1);
    }

    return (  
        <Card elevation={8} sx={{ 
                width: 400, 
                height: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between' 
            }}>
            <StyledCardContent sx={{ paddingBottom: 0 }}>
                <Grid container height={50}>
                    <Grid item xs>
                        <Typography fontSize={16} fontWeight={700} height={40} paddingTop={0.5}>
                            {stage.name}
                        </Typography>
                    </Grid>
                    {!tourney.done && 
                    <Grid item xs='auto'>
                        <CardActions sx={{ padding: 0 }}>
                            <StageEditForm initialValues={stage}/>
                            {!stage.mappoolPublic && !stage.schedulePublic && !stage.statsPublic &&
                            <ConfirmationDialog 
                                btnProps={{ color: 'error' }} 
                                btnIcon={<Delete/>}
                                title='Are you sure you wish to delete this stage?'
                                actionTitle='Delete'
                                action={() => onDelete()}/>}
                        </CardActions>
                    </Grid>}
                </Grid>
                <StageInfo stage={stage}/>
            </StyledCardContent>
            <StyledCardContent sx={{ paddingTop: 0 }}>
                <Box className='divider'/>
                <Grid container height={30} justifyContent='space-between' alignItems='end'>
                    <VisibilityMarker title='Mappools' isPublic={stage.mappoolPublic}/>
                    <VisibilityMarker title='Schedule' isPublic={stage.schedulePublic}/>
                    <VisibilityMarker title='Statistics' isPublic={stage.statsPublic}/>
                </Grid>
            </StyledCardContent>
        </Card>
    );
}

export default StageCard;