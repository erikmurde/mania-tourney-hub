import { Grid } from '@mui/material';
import { IMapDto } from '../../../dto/map/IMapDto';
import MapCard from './card/MapCard';
import { MapService } from '../../../services/mapService';
import NoItems from '../NoItems';

const MapList = ({maps}: {maps: IMapDto[]}) => {
    const service = new MapService();

    return (  
        <>
        {maps.length > 0 
        ?   <Grid container spacing={2} justifyContent='center'>
                {maps
                    .sort((a, b) => service.getWeight(a) - service.getWeight(b))
                    .map(map => 
                        <Grid item key={map.id}>
                            <MapCard map={map}/>
                        </Grid>
                )}
            </Grid>
        :   <NoItems name='maps'/>}
        </>
    );
}

export default MapList;