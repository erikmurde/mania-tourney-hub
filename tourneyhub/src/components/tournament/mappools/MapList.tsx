import { Grid } from '@mui/material';
import { IMapDto } from '../../../dto/map/IMapDto';
import MapCard from './card/MapCard';

const MapList = (props: {maps: IMapDto[]}) => {
    return (  
        <Grid container spacing={2} justifyContent='center'>
            {props.maps.map(map => 
                <Grid item key={map.id}>
                   <MapCard map={map}/>
                </Grid>
            )}
        </Grid>
    );
}

export default MapList;