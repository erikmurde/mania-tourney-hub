import { Grid } from '@mui/material';
import { IMapDto } from '../../../dto/map/IMapDto';
import MapCard from './card/MapCard';
import NoItems from '../NoItems';

interface IProps {
    mappool: IMapDto[],
    activeAudioId: string,
    paused: boolean,
    handleAudio: (mapId: string, src: string | undefined) => void
}

const MapList = ({mappool, activeAudioId, paused, handleAudio}: IProps) => {

    return (  
        <Grid container spacing={2} justifyContent='center'>
            {mappool.map(map => 
                <Grid item key={map.id}>
                    <MapCard 
                        map={map} 
                        audioPlaying={map.id === activeAudioId && !paused} 
                        handleAudio={handleAudio}/>
                </Grid>
            )}
            {mappool.length === 0 && <NoItems name='maps'/>}
        </Grid>
    );
}

export default MapList;