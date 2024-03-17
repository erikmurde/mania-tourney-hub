import { Grid, Tab, Tabs } from '@mui/material';
import { MapStatsDto } from '../../../dto/statistics/MapStatsDto';

interface IProps {
    maps: MapStatsDto[],
    mapId: string,
    setMapId: (value: string) => void
}

const StatsTabs = ({maps, mapId, setMapId}: IProps) => {
    return (  
        <Grid item xs margin='auto' container justifyContent='center'>
            <Tabs sx={{ maxWidth: 600 }}
                variant='scrollable'
                scrollButtons='auto'
                value={mapId}
                onChange={(_, value) => setMapId(value)}
                >
                <Tab label='mappool' value='' onClick={() => setMapId('')}/>
                {maps.map(map => 
                    <Tab 
                        key={map.id} 
                        label={`${map.type}${map.index > 0 ? map.index : ''}`}
                        value={map.id} onClick={() => setMapId(map.id)}
                    />
                )}
            </Tabs>
        </Grid>
    );
}

export default StatsTabs;