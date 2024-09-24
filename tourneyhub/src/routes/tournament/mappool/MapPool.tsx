import { Grid, Paper } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
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
import { useTourney } from '../TournamentHeader';

const MapPool = () => {
    const { tourney } = useTourney();
    const { mapPoolUpdate } = useContext(UpdateContext);

    const [isManage, setIsManage] = useState(false);
    const [stages, setStages] = useState([] as IStageDto[]);
    const [stageId, setStageId] = useState(null as string | null);
    const [maps, setMaps] = useState([] as IMapDto[]);

    const [audio] = useState(new Audio());
    const [paused, setPaused] = useState(true);
    const [activeAudioId, setActiveAudioId] = useState('');

    audio.onpause = () => setPaused(true);
    audio.onplay = () => setPaused(false);
    audio.onended = () => setPaused(true);
    audio.volume = 0.04;

    useEffect(() => {
        return () => audio.pause();
    }, []);

    useEffect(() => {
        new StageService()
            .getByTournamentId(tourney.id)
            .then(stages => {
                setStages(stages);
                setStageId(stages.length > 0 ? stages[0].id : null);
            });
    }, [tourney.id]);

    useEffect(() => {
        audio.pause();
        setActiveAudioId('');
    }, [mapPoolUpdate]);

    useEffect(() => {
        if (!stageId) {
            return;
        }
        const service = new MapService();

        if (isManage) {
            service.getAllByStageId(stageId)
                .then(maps => setMaps(maps));
        } else {
            const stage = stages.find(stage => stage.id === stageId);

            if (!stage || !stage.mappoolPublished) {
                setMaps([]);
                return;
            }
            service.getAllInMappoolByStageId(stageId)
                .then(maps => setMaps(maps));
        }
    }, [stageId, isManage, mapPoolUpdate, stages]);

    const handleAudio = (mapId: string, src: string | undefined) => {       
        if (!src) {
            return;
        }
        if (mapId === activeAudioId) {
            paused ? audio.play(): audio.pause();
        } else {
            setActiveAudioId(mapId);
            audio.src = src;
            audio.play();
        }
    }

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
                        stage={stages.find(stage => stage.id === stageId) ?? null}
                        mappool={maps}
                    />}/>
                <Grid item xs>
                    {isManage 
                    ?   <MapManageList 
                            mappool={maps} 
                            activeAudioId={activeAudioId} 
                            paused={paused} 
                            handleAudio={handleAudio}
                        />
                    :   <MapList 
                            mappool={maps.filter(map => map.inMappool)} 
                            activeAudioId={activeAudioId} 
                            paused={paused} 
                            handleAudio={handleAudio}/>}
                </Grid>
            </Grid>
        </Paper>
    );
}
 
export default MapPool;