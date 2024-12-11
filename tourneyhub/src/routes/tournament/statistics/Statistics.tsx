import { Grid, Paper } from '@mui/material';
import SectionTitle from '../../../components/tournament/SectionTitle';
import { useContext, useEffect, useState } from 'react';
import StageTabs from '../../../components/tournament/StageTabs';
import { StageService } from '../../../services/stageService';
import { IStageDto } from '../../../dto/stage/IStageDto';
import NoItems from '../../../components/tournament/NoItems';
import StageStats from '../../../components/tournament/statistics/StageStats';
import { AuthContext, ErrorContext } from '../../Root';
import { AuthService } from '../../../services/authService';
import StatsTabs from '../../../components/tournament/statistics/tabs/StatsTabs';
import { MapStatsService } from '../../../services/mapStatsService';
import { MapStatsDto } from '../../../dto/statistics/MapStatsDto';
import MapStats from '../../../components/tournament/statistics/MapStats';
import { MAPPOOL, QUALIFIER, SEEDING } from '../../../constants';
import SeedingStats from '../../../components/tournament/statistics/SeedingStats';
import { useTourney } from '../TournamentHeader';
import ConfirmationDialog from '../../../components/tournament/dialog/ConfirmationDialog';
import SuccessDialog from '../../../components/tournament/dialog/SuccessDialog';

const Statistics = () => {
    const { setError } = useContext(ErrorContext);
    const { user } = useContext(AuthContext);
    const { tourney } = useTourney();

    const [stages, setStages] = useState([] as IStageDto[]);
    const [mapStats, setMapStats] = useState([] as MapStatsDto[]);
    const [stageId, setStageId] = useState(null as string | null);
    const [selectedStats, setSelectedStats] = useState('');
    const [successOpen, setSuccessOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const service = new MapStatsService();

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
        if (!stage) {
            return;
        }
        const controller = new AbortController();
        setLoading(true);

        service
            .getAllInStage(stage.id, controller.signal)
            .then(stats => {
                setMapStats(stats ?? []);
                setSelectedStats(stage!.stageType.name === QUALIFIER ? SEEDING : MAPPOOL);
                setLoading(stats === undefined);
            });

        return () => controller.abort();
    }, [stage]);

    const updateSeeding = async(stageId: string) => {
        const error = await service.seedParticipants(stageId);

        if (error) {
            return setError(error);
        }
        setSuccessOpen(true);
    }

    const teams = tourney.minTeamSize > 1;
    const isHost = user && new AuthService().isHost(user, tourney.id);
    const map = mapStats.find(map => map.id === selectedStats);
    
    const statsVisible = (stage?.statsPublished || isHost) && mapStats.length > 0;

    return (  
        <Paper elevation={2} sx={{ minHeight: 800, paddingBottom: 2 }}>
            <Grid container>
                <SectionTitle title='Statistics' xsAuto/>
                {statsVisible && stage && !loading &&
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
                        isHost && stage.stageType.name === QUALIFIER
                        ?   <ConfirmationDialog 
                                title={`Update ${teams ? 'team' : 'player'} seeding?`}
                                description={`
                                    This will assign a seed to every ${teams ? 'team' : 'player'} based on current qualifier results.
                                `}
                                actionTitle='Update'
                                btnProps={{ title: 'Update seeding' }}
                                action={() => updateSeeding(stage!.id)}
                            />
                        :   <></>
                    }/>
                <Grid item xs
                    marginLeft={map ? 0 : 2} 
                    marginRight={map ? 0 : 2} 
                    container={map !== undefined || selectedStats === SEEDING} 
                    justifyContent='center'>
                    {!loading && 
                    <>
                    {map &&
                    <MapStats stats={map} stageType={stage.stageType.name} teamTourney={tourney.minTeamSize > 1}/>} 
                    {selectedStats === SEEDING && statsVisible &&
                    <SeedingStats
                        mapStats={mapStats}
                        numAdvancing={stage.numAdvancing}
                        teamTourney={tourney.minTeamSize > 1}
                    />}
                    {(stage.statsPublished || isHost) && stage.id && selectedStats === MAPPOOL && mapStats.length > 0 &&
                    <StageStats mapStats={mapStats} tourney={tourney}/>}
                    </>}
                    <NoItems name={'statistics'} loading={loading} display={!statsVisible}/>
                </Grid>
            </Grid>}
            <SuccessDialog 
                title='Seeding updated successfully!'
                open={successOpen} 
                setOpen={setSuccessOpen}/>
        </Paper>
    );
}

export default Statistics;