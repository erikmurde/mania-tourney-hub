import { Grid } from '@mui/material';
import { IMapDto } from '../../../dto/map/IMapDto';
import MapCard from './card/MapCard';

const MapList = (props: {maps: IMapDto[]}) => {
    const weights = new Map<string, number>([
        ['RC', 0], ['LN', 10], ['HB', 20], ['SV', 30], ['TB', 40]
    ])

    const getWeight = (map: IMapDto): number => {
        return (weights.get(map.mapType.name) ?? 0) + map.index;
    }

    return (  
        <Grid container spacing={2} justifyContent='center'>
            {props.maps
                .sort((a, b) => getWeight(a) - getWeight(b))
                .map(map => 
                    <Grid item key={map.id}>
                        <MapCard map={map}/>
                    </Grid>
            )}
        </Grid>
    );
}

export default MapList;