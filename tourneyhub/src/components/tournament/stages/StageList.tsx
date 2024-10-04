import { Grid } from '@mui/material';
import { IStageDto } from '../../../dto/stage/IStageDto';
import StageCard from './card/StageCard';

const StageList = ({stages}: {stages: IStageDto[]}) => {
    return (  
        <Grid container spacing={2} justifyContent='center'>
            {stages.map((stage) =>
                <Grid item key={stage.id}>
                    <StageCard stage={stage}/>
                </Grid>
            )}
        </Grid>
    );
}

export default StageList;