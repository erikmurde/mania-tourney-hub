import { Card, CardMedia, CardContent, CardActions, Grid, useTheme, IconButton } from '@mui/material';
import MapParams from './MapParams';
import MapText from './MapText';
import { IMapDto } from '../../../../dto/map/IMapDto';
import MapTypeBox from '../../../MapTypeBox';
import { Pause, PlayArrow, Download } from '@mui/icons-material';

interface IProps {
    map: IMapDto,
    audioPlaying: boolean,
    handleAudio: (mapId: string, src: string | undefined) => void
}

const MapCard = ({map, audioPlaying, handleAudio}: IProps) => {
    const theme = useTheme();

    return (  
        <Card sx={{ display: 'flex', flexDirection: 'column', height: 350, width: 300 }} 
            elevation={8}>
                <CardMedia
                    sx={{ height: 120 }}
                    className='map-cover'
                    image={map.cover}
                    title={`cover of ${map.title}`}/>
            <CardContent sx={{ padding: 1 }}>
                <Grid container height={40} justifyContent='space-between'>
                    <Grid item>
                        <MapTypeBox mapType={map.mapType} index={map.index}/>
                    </Grid>
                    <Grid item>
                        {map.songPreview &&
                        <IconButton 
                            color='primary' 
                            onClick={() => handleAudio(map.id, map.songPreview)}
                            >
                            {audioPlaying ? <Pause/> : <PlayArrow/>}
                        </IconButton>}
                        <IconButton 
                            sx={{ color: theme.palette.primary.main}} 
                            href={map.download}
                            target='_blank'
                            size='small'>
                            <Download/>
                        </IconButton>
                    </Grid>
                </Grid>
                <MapText map={map} manage={false}/>
            </CardContent>
            <Grid item xs/>
            <CardActions sx={{ paddingBottom: 0 }}>
                <MapParams map={map}/>
            </CardActions>
        </Card>
    );
}

export default MapCard;