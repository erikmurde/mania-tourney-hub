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
    addToPool: (id: string, key: string) => void
    removeFromPool: (map: IMapDto) => void
}

const MapManageCard = ({map, mappool, addToPool, removeFromPool}: IProps) => {
    const { tourney } = useTourney();
    const { user } = useContext(AuthContext);
    const theme = useTheme();
 
    const canAddToPool = user && user.roles
        .filter(role => role.tournamentId === tourney.id)
        .some(role => [HOST, ADMIN, MAPPOOLER].includes(role.name));

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
                sx={{ width: 300, minWidth: 300, objectFit: 'cover' }}
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
                    tourneyDone={tourney.done}
                />
                <Grid container flexGrow={1}
                />
                {!tourney.done && canAddToPool && 
                <Grid container justifyContent='end' paddingRight={1}>
                    <Grid item>
                        <Tooltip title={disabled ? 'Needs a beatmap ID' : ''}>
                            <span>
                                <Button 
                                    disabled={disabled}
                                    sx={{ width: 180 }}
                                    variant='outlined'
                                    color={map.inMappool ? 'error' : 'success'} 
                                    onClick={() => map.inMappool 
                                        ? removeFromPool(map) 
                                        : addToPool(map.id, `${map.mapType}${map.index}`)}>
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