import { Card, CardMedia, CardContent, CardActions, Grid } from '@mui/material';
import MapInfo from './MapInfo';
import MapParams from './MapParams';
import MapText from './MapText';
import { IMapDto } from '../../../../dto/map/IMapDto';

const MapCard = (props: {map: IMapDto}) => {
    return (  
        <Card sx={{ display: 'flex', flexDirection: 'column', height: 350, width: 300 }} 
            elevation={8}>
            <CardMedia 
                sx={{ height: 120 }}
                className='map-cover'
                image={props.map.cover}
                title={`cover of ${props.map.title}`}/>
            <CardContent sx={{ padding: 1 }}>
                <MapInfo map={props.map}/>
                <MapText map={props.map} manage={false}/>
            </CardContent>
            <Grid item xs/>
            <CardActions sx={{ paddingBottom: 0 }}>
                <MapParams map={props.map}/>
            </CardActions>
        </Card>
    );
}

export default MapCard;