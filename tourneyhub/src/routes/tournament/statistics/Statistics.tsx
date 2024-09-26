import { Grid, Paper } from '@mui/material';
import SectionTitle from '../../../components/tournament/SectionTitle';
import { useContext, useEffect, useState } from 'react';
import StageTabs from '../../../components/tournament/StageTabs';
import { StageService } from '../../../services/stageService';
import { IStageDto } from '../../../dto/stage/IStageDto';
import NoItems from '../../../components/tournament/NoItems';
import StageStats from '../../../components/tournament/statistics/StageStats';
import { AuthContext } from '../../Root';
import { AuthService } from '../../../services/authService';
import StatsTabs from '../../../components/tournament/statistics/tabs/StatsTabs';
import { MapStatsService } from '../../../services/mapStatsService';
import { MapStatsDto } from '../../../dto/statistics/MapStatsDto';
import MapStats from '../../../components/tournament/statistics/MapStats';
import { MAPPOOL, QUALIFIER, SEEDING } from '../../../constants';
import SeedingStats from '../../../components/tournament/statistics/SeedingStats';
import { useTourney } from '../TournamentHeader';

const Statistics = () => {
    const { tourney } = useTourney();
    const { user } = useContext(AuthContext);
    const [stages, setStages] = useState([] as IStageDto[]);
    const [mapStats, setMapStats] = useState([] as MapStatsDto[]);
    const [stageId, setStageId] = useState(null as string | null);
    const [selectedStats, setSelectedStats] = useState('');

    useEffect(() => {
        new StageService()
            .getByTournamentId(tourney.id)
            .then(stages => {
                setStages(stages);
                setStageId(stages.length > 0 ? stages[0].id : null);
            });
    }, [tourney.id]);

    let stage = stages.find(stage => stage.id === stageId);

    useEffect(() => {
        if (stage) {
            new MapStatsService()
                .getAllInStage(stage.id)
                .then(stats => {
                    setMapStats(stats);
                    setSelectedStats(stage!.stageType.name === QUALIFIER ? SEEDING : MAPPOOL);
                });
        }
    }, [stage]);

    const isHost = user && new AuthService().isHost(user, tourney.id);
    const map = mapStats.find(map => map.id === selectedStats);
    
    const statsVisible = (stage?.statsPublished || isHost) && mapStats.length > 0;

    return (  
        <Paper elevation={2} sx={{ minHeight: 500, paddingBottom: 2 }}>
            <Grid container>
                <SectionTitle title='Statistics' xsAuto/>
                {statsVisible && stage &&
                <StatsTabs
                    maps={mapStats}
                    stageType={stage.stageType.name}
                    selectedStats={selectedStats}
                    setSelectedStats={setSelectedStats}
                />}
            </Grid>
            {stage &&
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
                    container={map !== undefined || selectedStats === SEEDING} 
                    justifyContent='center'
                    >
                    {map && 
                    <MapStats stats={map} teamTourney={tourney.minTeamSize > 1}/>} 
                    {selectedStats === SEEDING && statsVisible &&
                    <SeedingStats 
                        mapStats={mapStats}
                        numAdvancing={stage.numAdvancing}
                        teamTourney={tourney.minTeamSize > 1}
                    />}
                    {(stage.statsPublished || isHost) && stage.id && selectedStats === MAPPOOL && mapStats.length > 0 &&
                    <StageStats mapStats={mapStats} tourney={tourney}
                    />}
                    {!statsVisible && <NoItems name={'statistics'}/>}
                </Grid>
            </Grid>}
        </Paper>
    );
}

export default Statistics;