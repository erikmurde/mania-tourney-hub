import { Grid, Tabs, Tab } from '@mui/material';
import { IStageDto } from '../../dto/stage/IStageDto';

interface IProps {
    stages: IStageDto[],
    stageId: number,
    buttons: JSX.Element,
    setStageId: (value: number) => void
}

const StageTabs = ({stages, stageId, buttons, setStageId} : IProps) => {
    return (  
        <Grid container item direction='column' alignItems='center' 
            width={200} 
            marginLeft={5} 
            rowSpacing={1}
            >
            <Grid item>
                <Tabs sx={{ width: 200, marginBottom: 2 }}
                    value={stageId}
                    orientation='vertical' 
                    onChange={(e, value) => setStageId(value)}>

                    {stages.map(stage => 
                        <Tab key={stage.id} label={stage.name} value={parseInt(stage.id)} href={`#${stage.id}`}/>
                    )}
                </Tabs>
            </Grid>
            {buttons}
        </Grid>
    );
}
 
export default StageTabs;