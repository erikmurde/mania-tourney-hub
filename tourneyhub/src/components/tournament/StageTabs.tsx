import { Grid, Tabs, Tab } from '@mui/material';
import { IStageDto } from '../../dto/stage/IStageDto';

interface IProps {
    stages: IStageDto[],
    stageId: string,
    buttons: JSX.Element,
    setStageId: (value: string) => void
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
                    value={stageId === '' ? false : stageId}
                    orientation='vertical' 
                    onChange={(_, value) => setStageId(value)}>

                    {stages.map(stage => 
                        <Tab key={stage.id} label={stage.name} value={stage.id}/>
                    )}
                </Tabs>
            </Grid>
            {buttons}
        </Grid>
    );
}

export default StageTabs;