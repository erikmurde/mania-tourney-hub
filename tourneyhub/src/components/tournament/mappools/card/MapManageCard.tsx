import { Card, CardMedia, CardContent, useTheme, Grid, CardActions, Button, Tooltip } from '@mui/material';
import MapParams from './MapParams';
import MapText from './MapText';
import { IMapDto } from '../../../../dto/map/IMapDto';
import MapManageButtons from './MapManageButtons';
import { useContext } from 'react';
import { AuthContext } from '../../../../routes/Root';
import { ADMIN, HOST, MAPPOOLER } from '../../../../constants';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';

interface IProps {
    map: IMapDto,
    mappool: IMapDto[],
    audioPlaying: boolean,
    handleAudio: (mapId: string, src: string | undefined) => void,
    updateInMappool: (id: string, inMappool: boolean) => void
}

const MapManageCard = ({map, mappool, audioPlaying, handleAudio, updateInMappool}: IProps) => {
    const { tourney } = useTourney();
    const { user } = useContext(AuthContext);
    const theme = useTheme();
 
    const canAddToPool = user && user.roles
        .filter(tourneyRole => tourneyRole.tournamentId === tourney.id)
        .some(tourneyRole => [HOST, ADMIN, MAPPOOLER].includes(tourneyRole.role));

    const disabled = !map.inMappool && !map.beatmapId;

    return (
        <Card 
            elevation={12}
            sx={{ 
                borderBottom: map.inMappool ? 2 : 0, 
                borderBottomColor: theme.palette.success.main ,
                display: 'flex'
            }}>
            <CardMedia
                sx={{ minWidth: 300, borderRadius: 0.5, objectFit: 'cover' }}
                image={map.cover}
                title={`cover of ${map.title}`}/>
            <CardContent sx={{ padding: 1, paddingBottom: 0 }}>
                <MapText map={map} manage={true}/>
                <MapParams map={map}/>
            </CardContent>
            <Grid item xs/>
            <CardActions sx={{ alignItems: 'start', flexDirection: 'column' }}>
                <MapManageButtons 
                    map={map} 
                    mappool={mappool} 
                    tourneyDone={tourney.concluded}
                    audioPlaying={audioPlaying}
                    handleAudio={handleAudio}
                />
                <Grid container flexGrow={1}
                />
                {!tourney.concluded && canAddToPool && 
                <Grid container justifyContent='end' paddingRight={1}>
                    <Grid item>
                        <Tooltip title={disabled ? 'Needs a beatmap ID' : ''}>
                            <span>
                                <Button 
                                    disabled={disabled}
                                    sx={{ width: 180 }}
                                    variant='outlined'
                                    color={map.inMappool ? 'error' : 'success'} 
                                    onClick={() => updateInMappool(map.id, !map.inMappool)}>
                                    {map.inMappool ? 'Remove from pool' : 'Add to pool'}
                                </Button>
                            </span>
                        </Tooltip>
                    </Grid>
                </Grid>}
            </CardActions>
        </Card>
    );
}
 
export default MapManageCard;