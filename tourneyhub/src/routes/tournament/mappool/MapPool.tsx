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
import NoItems from '../../../components/tournament/NoItems';

const MapPool = () => {
    const { tourney } = useTourney();
    const { mapPoolUpdate } = useContext(UpdateContext);

    const [isManage, setIsManage] = useState(false);
    const [stages, setStages] = useState([] as IStageDto[]);
    const [stageId, setStageId] = useState(null as string | null);
    const [maps, setMaps] = useState([] as IMapDto[]);
    const [loading, setLoading] = useState(true);

    const [audio] = useState(new Audio());
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeAudioId, setActiveAudioId] = useState('');

    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);
    audio.onended = () => setIsPlaying(false);
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
        const controller = new AbortController();
        setLoading(true);

        if (isManage) {
            service
                .getAllByStageId(stageId, controller.signal)
                .then(maps => updateMaps(maps));
        } else {
            service
                .getAllInMappoolByStageId(stageId, controller.signal)
                .then(maps => updateMaps(maps));
        }
        return () => controller.abort();
    }, [stageId, isManage, mapPoolUpdate, stages]);

    const updateMaps = (maps: IMapDto[] | undefined) => {
        setMaps(maps ?? []);
        setLoading(maps === undefined);
    }

    const handleAudio = (mapId: string, src: string | undefined) => {       
        if (!src) {
            return;
        }
        if (mapId === activeAudioId) {
            !audio.paused ? audio.pause(): audio.play().catch(() => {});
        } else {
            setActiveAudioId(mapId);
            audio.src = src;
            if (audio.paused) {
                audio.play().catch(() => {});
            }
        }
    }

    return (  
        <Paper elevation={2} sx={{ minHeight: 800, paddingBottom: 2 }}>
            <Grid container>
                <SectionTitle title={isManage ? 'Manage mappools' : 'Mappools'}/>
                {stageId && 
                <>                
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
                    />}
                />
                <Grid item xs>
                    <NoItems name='maps' loading={loading} display={maps.length === 0}/>
                    {!loading &&
                    <>
                    {isManage 
                    ?   <MapManageList 
                            mappool={maps} 
                            activeAudioId={activeAudioId} 
                            audioPlaying={isPlaying} 
                            handleAudio={handleAudio}
                        />
                    :   <MapList 
                            mappool={maps.filter(map => map.inMappool)} 
                            activeAudioId={activeAudioId} 
                            audioPlaying={isPlaying} 
                            handleAudio={handleAudio}/>}
                    </>}
                </Grid>
                </>}
            </Grid>
        </Paper>
    );
}
 
export default MapPool;