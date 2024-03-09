import { Grid, Paper } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MapList from '../../../components/tournament/mappools/MapList';
import { IMapDto } from '../../../dto/map/IMapDto';
import { StageService } from '../../../services/stageService';
import { MapService } from '../../../services/mapService';
import PoolButtons from '../../../components/tournament/mappools/PoolButtons';
import MapManageList from '../../../components/tournament/mappools/MapManageList';
import { UpdateContext } from '../../Root';
import { IStageDto } from '../../../dto/stage/IStageDto';
import SectionTitle from '../../../components/tournament/SectionTitle';
import StageTabs from '../../../components/tournament/StageTabs';

const MapPool = () => {
    const { mapPoolUpdate } = useContext(UpdateContext);
    const [isManage, setIsManage] = useState(false);
    const [stages, setStages] = useState([] as IStageDto[]);
    const [stageId, setStageId] = useState(0);
    const [maps, setMaps] = useState([] as IMapDto[]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            new StageService().getAllTourney(id)
                .then(stages => setStages(stages))
                .then(() => {
                    const stageId = stages.length > 0 ? parseInt(stages[0].id) : 0;

                    setStageId(stageId);
                    navigate(`#${stageId}`);
                });
        }
    }, [id]);

    useEffect(() => {
        const service = new MapService();

        if (isManage) {
            service.getAllStage(stageId.toString())
                .then(maps => setMaps(maps));
        } else {
            service.getAllStageInMappool(stageId.toString())
                .then(maps => setMaps(maps));
        }
    }, [stageId, isManage, mapPoolUpdate]);

    return (  
        <Paper elevation={2} sx={{ minHeight: 500, paddingBottom: 2 }}>
            <Grid container>
                <SectionTitle title={isManage ? 'Manage mappools' : 'Mappools'}/>
                <StageTabs 
                    stages={stages} 
                    stageId={stageId} 
                    setStageId={setStageId}
                    buttons={
                    <PoolButtons 
                        manage={isManage}
                        setManage={setIsManage}
                        stage={stages.find(stage => stage.id === stageId.toString()) ?? {} as IStageDto}
                    />}/>
                <Grid item xs>
                    {isManage 
                    ?   <MapManageList maps={maps}/>
                    :   <MapList maps={maps.filter(map => map.inMappool)}/>}
                </Grid>
            </Grid>
        </Paper>
    );
}
 
export default MapPool;