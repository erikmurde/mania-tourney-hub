import { Grid, Typography, useTheme } from '@mui/material';
import { IMapDto } from '../../../../dto/map/IMapDto';
import { AccessTime, Speed, StarOutline } from '@mui/icons-material';

const MapParams = (props: {map: IMapDto}) => {
    const theme = useTheme();
    const color = theme.palette.primary.main;

    return (  
        <Grid container marginBottom={1}>
            <Grid container item xs='auto'>
                <StarOutline sx={{ color: color, marginRight: 0.5 }}/>
                <Typography minWidth={45}> 
                    {props.map.sr}
                </Typography>
            </Grid>
            <Grid container item xs='auto'>
                <AccessTime sx={{ color: color, marginRight: 0.5 }}/>
                <Typography minWidth={45}>
                    {`${Math.floor(props.map.drainTime / 60)}:${(props.map.drainTime % 60)
                        .toString()
                        .padStart(2, '0')}`}
                </Typography>
            </Grid>
            <Grid container item xs='auto'>
                <Speed sx={{ color: color, marginRight: 0.5 }}/>
                <Typography minWidth={45}>
                    {props.map.bpm}
                </Typography>
            </Grid>
            <Grid container item xs='auto'>
                <Typography color={color} className='map-param'>
                    HP
                </Typography>
                <Typography minWidth={45}>
                    {props.map.hp}
                </Typography>
            </Grid>
            <Grid container item xs='auto'>
                <Typography color={color} className='map-param'>
                    OD
                </Typography>
                <Typography minWidth={45}>
                    {props.map.od}
                </Typography>
            </Grid>
        </Grid>
    );
}
 
export default MapParams;