import { Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ISimpleStageDto } from '../../../dto/stage/ISimpleStageDto';
import { useParams } from 'react-router-dom';
import MapList from '../../../components/tournament/mappools/MapList';
import { IMapDto } from '../../../dto/map/IMapDto';
import { StageService } from '../../../services/stageService';
import { MapService } from '../../../services/mapService';
import PoolButtons from '../../../components/tournament/mappools/PoolButtons';
import MapManageList from '../../../components/tournament/mappools/MapManageList';

const MapPool = (props: {manage: boolean}) => {
    const [stages, setStages] = useState([] as ISimpleStageDto[]);
    const [maps, setMaps] = useState([] as IMapDto[]);
    const [value, setValue] = useState(0);
    const { id } = useParams();
    const stageService = new StageService();
    const mapService = new MapService();

    useEffect(() => {
        stageService.getAllSimple(id!)
            .then(stages => setStages(stages))
            .then(() => setValue(stages.length > 0 ? parseInt(stages[0].id) : 0));
    }, [id]);

    useEffect(() => {
        mapService.getAllStage(value.toString())
            .then(maps => setMaps(maps));
    }, [value]);

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

                        {props.manage ? 'Manage mappools' : 'Mappools'}
                    </Typography>
                </Grid>
                <Grid container item direction='column' alignItems='center' 
                    width={200} 
                    marginLeft={5} 
                    rowSpacing={1}>

                    <Grid item>
                        <Tabs sx={{ width: 200, marginBottom: 2 }}
                            value={value} 
                            orientation='vertical' 
                            onChange={(e, value) => setValue(value)}>

                            {stages.map(stage => 
                                <Tab key={stage.id} label={stage.name} value={parseInt(stage.id)}/>
                            )}
                        </Tabs>
                    </Grid>
                    <PoolButtons manage={props.manage}/>
                </Grid>
                <Grid item xs>
                    {props.manage 
                    ?   <MapManageList maps={maps}/>
                    :   <MapList maps={maps.filter(map => map.inMappool)}/>}
                </Grid>
            </Grid>
        </Paper>
    );
}
 
export default MapPool;