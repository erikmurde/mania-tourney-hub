import { Grid, Paper } from '@mui/material';
import SectionTitle from '../../../components/tournament/SectionTitle';
import { useContext, useEffect, useState } from 'react';
import StageTabs from '../../../components/tournament/StageTabs';
import { StageService } from '../../../services/stageService';
import { useParams, useNavigate } from 'react-router-dom';
import { IStageDto } from '../../../dto/stage/IStageDto';
import NoItems from '../../../components/tournament/NoItems';
import StageStats from '../../../components/tournament/statistics/StageStats';
import { AuthContext } from '../../Root';
import { AuthService } from '../../../services/authService';
import StatsTabs from '../../../components/tournament/statistics/StatsTabs';
import { MapStatsService } from '../../../services/mapStatsService';
import { MapStatsDto } from '../../../dto/statistics/MapStatsDto';
import MapStats from '../../../components/tournament/statistics/MapStats';

const Statistics = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [stages, setStages] = useState([] as IStageDto[]);
    const [mapStats, setMapStats] = useState([] as MapStatsDto[]);
    const [stageId, setStageId] = useState('');
    const [mapId, setMapId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            new StageService()
                .getAllTourney(id)
                .then(stages => setStages(stages))
                .then(() => {
                    const stageId = stages.length > 0 ? stages[0].id : '';

                    setStageId(stageId);
                    navigate(`#${stageId}`);
                });
        }
    }, [id]);

    let stage = stages.find(stage => 
        stage.id === stageId.toString()
    ) ?? {} as IStageDto;

    useEffect(() => {
        if (stage.id) {
            new MapStatsService()
                .getAllStage(stage.id)
                .then(stats => setMapStats(stats))
                .then(() => {
                    const mapId = mapStats.length > 0 ? mapStats[0].id : '';
                    setMapId(mapId);
                });
        }
    }, [stage.id]);

    const isHost = id && user && new AuthService().isHost(user, id);
    const map = mapStats.find(map => map.id === mapId);

    return (  
        <Paper elevation={2} sx={{ minHeight: 500, paddingBottom: 2 }}>
            <Grid container>
                <SectionTitle title='Statistics' xsAuto/>
                <StatsTabs
                    maps={mapStats}
                    mapId={mapId}
                    setMapId={setMapId}
                />
            </Grid>
            <Grid container>
                <StageTabs 
                    stages={stages} 
                    stageId={stageId} 
                    setStageId={setStageId}
                    buttons={
                        <></>
                    }/>
                <Grid item xs
                    marginLeft={map ? 0 : 2} 
                    marginRight={map ? 0 : 2} 
                    container={map !== undefined} 
                    justifyContent='center'
                    >
                    {map
                    ?   <MapStats map={map}/>
                    :   (stage.statsPublic || isHost) && stage.id
                    ?   <StageStats stage={stage} mapStats={mapStats}/>
                    :   <NoItems name={'statistics'}/>}
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Statistics;