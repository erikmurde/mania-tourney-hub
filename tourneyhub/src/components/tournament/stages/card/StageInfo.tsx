import { Grid, Typography } from '@mui/material';
import { IStageDto } from '../../../../dto/stage/IStageDto';
import dayjs from 'dayjs';
import { QUALIFIER } from '../../../../constants';

const StageInfo = ({stage}: {stage: IStageDto}) => {
    const type = stage.stageType;

    return (
        <Grid container direction='column' flexGrow={1}>
            <Grid item>
                <Typography fontSize={14} height={30}>
                    {`${type[0].toUpperCase() + type.slice(1)} stage`}
                </Typography>
            </Grid>
            {type === QUALIFIER
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
                        {`Scheduling deadline ${dayjs(stage.schedulingDeadline)}`}
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