import { Grid } from '@mui/material';
import { IMapDto } from '../../../dto/map/IMapDto';
import MapCard from './card/MapCard';
import NoItems from '../NoItems';

const MapList = ({maps}: {maps: IMapDto[]}) => {

    return (  
        <Grid container spacing={2} justifyContent='center'>
            {maps.map(map => 
                <Grid item key={map.id}>
                    <MapCard map={map}/>
                </Grid>
            )}
            {maps.length === 0 && <NoItems name='maps'/>}
        </Grid>
    );
}

export default MapList;