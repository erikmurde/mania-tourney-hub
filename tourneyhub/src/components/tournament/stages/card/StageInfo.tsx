import { Grid, Typography } from '@mui/material';
import { IStageDto } from '../../../../dto/stage/IStageDto';

const StageInfo = ({stage}: {stage: IStageDto}) => {
    const type = stage.stageType.name;

    return (
        <Grid container direction='column' flexGrow={1}>
            <Grid item>
                <Typography fontSize={14} height={30}>
                    {`${type[0].toUpperCase() + type.slice(1)} stage`}
                </Typography>
            </Grid>
            {type === 'qualifier' 
            ?   <>
                <Grid item>
                    <Typography fontSize={14} height={30}>
                        {`Lobby size ${stage.lobbySize}`}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography fontSize={14} height={30}>
                        {`${stage.numAdvancing} players advance`}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography fontSize={14} height={30}>
                        {`Scheduling deadline ${stage.schedulingDeadline}`}
                    </Typography>
                </Grid>
                </>
            :   <Grid item>
                    <Typography fontSize={14} height={30}>
                        {`Best of ${stage.bestOf}`}
                    </Typography>
                </Grid>}
        </Grid>
    )
}

export default StageInfo;