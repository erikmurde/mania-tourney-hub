import { Download } from '@mui/icons-material';
import { Grid, IconButton, useTheme } from '@mui/material';
import { IMapDto } from '../../../../dto/map/IMapDto';
import MapTypeBox from '../../../MapTypeBox';

const MapInfo = ({map}: {map: IMapDto}) => {
    const theme = useTheme();

    return (  
        <Grid container height={40} justifyContent='space-between'>
            <Grid item>
                <MapTypeBox mapType={map.mapType.name} index={map.index}/>
            </Grid>
            <Grid item>
                <IconButton 
                    sx={{ color: theme.palette.primary.main}} 
                    className='icon-btn'
                    href={map.download}
                    target='_blank'>
                    <Download/>
                </IconButton>
            </Grid>
        </Grid>
    );
}

export default MapInfo;