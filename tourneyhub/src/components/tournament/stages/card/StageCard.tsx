import { Edit, Delete } from '@mui/icons-material';
import { Card, Grid, Typography, CardActions, IconButton, Paper, Box } from '@mui/material';
import { IStageDto } from '../../../../dto/stage/IStageDto';
import VisibilityMarker from './VisibilityMarker';
import { StyledCardContent } from '../../../styled/StyledCardContent';
import StageInfo from './StageInfo';
import ConfirmationDialog from '../../dialog/ConfirmationDialog';

const StageCard = ({stage}: {stage: IStageDto}) => {
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
                    <Grid item xs={3}>
                        <CardActions sx={{ padding: 0 }}>
                            <IconButton color='primary'>
                                <Edit/>
                            </IconButton>
                            <ConfirmationDialog 
                                btnProps={{ color: 'error' }} 
                                btnIcon={<Delete/>}
                                title='Are you sure you wish to delete this stage?'
                                actionTitle='Delete'
                                action={() => console.log()}/>
                        </CardActions>
                    </Grid>
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