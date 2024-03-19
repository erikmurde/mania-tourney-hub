import { Grid, Tab, Tabs } from '@mui/material';
import { MapStatsDto } from '../../../../dto/statistics/MapStatsDto';
import { QUALIFIER } from '../../../../constants';

interface IProps {
    maps: MapStatsDto[],
    mapId: string,
    stageType: string,
    setMapId: (value: string) => void
}

const StatsTabs = ({maps, mapId, stageType, setMapId}: IProps) => {
    if (stageType !== QUALIFIER && mapId === QUALIFIER) {
        mapId = '';
    }

    return (  
        <Grid item xs margin='auto' container justifyContent='center'>
            <Tabs sx={{ maxWidth: 600 }}
                variant='scrollable'
                scrollButtons='auto'
                value={mapId}
                onChange={(_, value) => setMapId(value)}
                >
                {stageType === QUALIFIER && 
                <Tab label='seeding' value={QUALIFIER}/>
                }
                <Tab label='mappool' value=''/>
                {maps.map(map => 
                    <Tab 
                        key={map.id} 
                        label={`${stageType === QUALIFIER ? 'S' : map.type}${map.index > 0 ? map.index : ''}`}
                        value={map.id} onClick={() => setMapId(map.id)}
                    />
                )}
            </Tabs>
        </Grid>
    );
}

export default StatsTabs;