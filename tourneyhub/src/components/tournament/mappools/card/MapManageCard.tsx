import { Card, CardMedia, CardContent, Box, useTheme, Grid, CardActionArea, Button } from '@mui/material';
import MapParams from './MapParams';
import MapText from './MapText';
import { IMapDto } from '../../../../dto/map/IMapDto';
import MapManageButtons from './MapManageButtons';

const MapManageCard = (props: {map: IMapDto}) => {
    const theme = useTheme();

    return (
        <Card elevation={12}>
            <Box display='flex' flexDirection='row'>
                <CardMedia 
                    sx={{ width: 300 }}
                    className=''
                    image={props.map.cover}
                    title={`cover of ${props.map.title}`}/>
                <CardContent sx={{ padding: 1, paddingBottom: '0 !important' }}>
                    <MapText map={props.map} manage={true}/>
                    <MapParams map={props.map}/>
                </CardContent>
                <Grid item xs/>
                <MapManageButtons download={props.map.download} inMappool={props.map.inMappool}/>
            </Box>
        </Card>
    );
}
 
export default MapManageCard;