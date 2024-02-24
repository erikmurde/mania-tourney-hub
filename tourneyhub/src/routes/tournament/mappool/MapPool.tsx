import { Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ISimpleStageDto } from '../../../dto/stage/ISimpleStageDto';
import { useNavigate, useParams } from 'react-router-dom';
import MapList from '../../../components/tournament/mappools/MapList';
import { IMapDto } from '../../../dto/map/IMapDto';
import { StageService } from '../../../services/stageService';
import { MapService } from '../../../services/mapService';
import PoolButtons from '../../../components/tournament/mappools/PoolButtons';
import MapManageList from '../../../components/tournament/mappools/MapManageList';

const MapPool = ({manage}: {manage?: boolean}) => {
    const [stages, setStages] = useState([] as ISimpleStageDto[]);
    const [stageId, setStageId] = useState(0);
    const [maps, setMaps] = useState([] as IMapDto[]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        new StageService().getAllSimple(id!)
            .then(stages => setStages(stages))
            .then(() => {
                const stageId = stages.length > 0 ? parseInt(stages[0].id) : 0;

                setStageId(stageId);
                navigate(`#${stageId}`);
            });
    }, [id]);

    useEffect(() => {
        const service = new MapService();

        if (manage) {
            service.getAllStage(stageId.toString())
                .then(maps => setMaps(maps));
        } else {
            service.getAllStageInMappool(stageId.toString())
                .then(maps => setMaps(maps));
        }
    }, [stageId, manage]);

    return (  
        <Paper elevation={2} sx={{ minHeight: 500, paddingBottom: 2 }}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h2' 
                        height={100} 
                        fontSize={46} 
                        fontWeight={400} 
                        marginLeft={5} 
                        lineHeight={2}>

                        {manage ? 'Manage mappools' : 'Mappools'}
                    </Typography>
                </Grid>
                <Grid container item direction='column' alignItems='center' 
                    width={200} 
                    marginLeft={5} 
                    rowSpacing={1}>

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
                    <PoolButtons manage={manage} stage={
                        stages.find(stage => stage.id === stageId.toString()) ?? {} as ISimpleStageDto
                    }/>
                </Grid>
                <Grid item xs>
                    {manage 
                    ?   <MapManageList maps={maps}/>
                    :   <MapList maps={maps.filter(map => map.inMappool)}/>}
                </Grid>
            </Grid>
        </Paper>
    );
}
 
export default MapPool;