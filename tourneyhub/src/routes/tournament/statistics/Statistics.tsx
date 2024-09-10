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
import StatsTabs from '../../../components/tournament/statistics/tabs/StatsTabs';
import { MapStatsService } from '../../../services/mapStatsService';
import { MapStatsDto } from '../../../dto/statistics/MapStatsDto';
import MapStats from '../../../components/tournament/statistics/MapStats';
import { QUALIFIER } from '../../../constants';
import SeedingStats from '../../../components/tournament/statistics/SeedingStats';
import { useTourney } from '../TournamentHeader';

const Statistics = () => {
    const { id } = useParams();
    const { tourney } = useTourney();
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
                    setMapId(stage.stageType === QUALIFIER ? QUALIFIER : '');
                });
        }
    }, [stage.id]);

    const isHost = id && user && new AuthService().isHost(user, id);
    const map = mapStats.find(map => map.id === mapId);

    const statsVisible = (stage.statsPublic || isHost) && mapStats.length > 0; 

    return (  
        <Paper elevation={2} sx={{ minHeight: 500, paddingBottom: 2 }}>
            <Grid container>
                <SectionTitle title='Statistics' xsAuto/>
                {statsVisible && 
                <StatsTabs
                    maps={mapStats}
                    mapId={mapId}
                    stageType={stage.stageType}
                    setMapId={setMapId}
                />}
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
                    container={map !== undefined || mapId === QUALIFIER} 
                    justifyContent='center'
                    >
                    {map && 
                    <MapStats map={map} teamTourney={tourney.minTeamSize > 1}/>} 
                    {mapId === QUALIFIER && (stage.statsPublic || isHost) && 
                    <SeedingStats 
                        mapStats={mapStats}
                        numAdvancing={stage.numAdvancing}
                        teamTourney={tourney.minTeamSize > 1}
                    />}
                    {(stage.statsPublic || isHost) && stage.id && mapId === '' && mapStats.length > 0 &&
                    <StageStats mapStats={mapStats} tourney={tourney}
                    />}
                    {!statsVisible && <NoItems name={'statistics'}/>}
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Statistics;