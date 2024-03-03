import { Card, CardMedia, CardContent, useTheme, Grid, CardActions, Button } from '@mui/material';
import MapParams from './MapParams';
import MapText from './MapText';
import { IMapDto } from '../../../../dto/map/IMapDto';
import MapManageButtons from './MapManageButtons';
import { useContext } from 'react';
import { AuthContext } from '../../../../routes/Root';
import { ADMIN, HOST, MAPPOOLER } from '../../../../constants';

interface IProps {
    map: IMapDto,
    addToPool: (id: string, key: string) => void
    removeFromPool: (map: IMapDto) => void
}

const MapManageCard = ({map, addToPool, removeFromPool}: IProps) => {
    const { user } = useContext(AuthContext);
    const theme = useTheme();
 
    const canAddToPool = user && user.roles
        .some(role => [HOST, ADMIN, MAPPOOLER].includes(role.name));

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
                <MapManageButtons map={map}
                />
                <Grid container flexGrow={1}
                />
                {canAddToPool && 
                <Grid container justifyContent='end' paddingRight={1}>
                    <Grid item>
                        <Button 
                            sx={{ width: 90 }}
                            variant='outlined'
                            color={map.inMappool ? 'error' : 'success'} 
                            onClick={() => map.inMappool 
                                ? removeFromPool(map) 
                                : addToPool(map.id, `${map.mapType.name}${map.index}`)}>
                            {map.inMappool ? 'Remove' : 'Add'}
                        </Button>
                    </Grid>
                </Grid>}
            </CardActions>
        </Card>
    );
}
 
export default MapManageCard;