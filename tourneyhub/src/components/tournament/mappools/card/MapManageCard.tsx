import { Card, CardMedia, CardContent, Box, Grid } from '@mui/material';
import MapParams from './MapParams';
import MapText from './MapText';
import { IMapDto } from '../../../../dto/map/IMapDto';
import MapManageButtons from './MapManageButtons';

const MapManageCard = ({map}: {map: IMapDto}) => {
    return (
        <Card elevation={12}>
            <Box display='flex' flexDirection='row'>
                <CardMedia 
                    sx={{ width: 300 }}
                    className=''
                    image={map.cover}
                    title={`cover of ${map.title}`}/>
                <CardContent sx={{ padding: 1, paddingBottom: '0 !important' }}>
                    <MapText map={map} manage={true}/>
                    <MapParams map={map}/>
                </CardContent>
                <Grid item xs/>
                <MapManageButtons map={map}/>
            </Box>
        </Card>
    );
}
 
export default MapManageCard;