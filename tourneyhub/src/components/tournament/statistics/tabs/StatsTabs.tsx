import { Grid, Tab, Tabs } from '@mui/material';
import { MapStatsDto } from '../../../../dto/statistics/MapStatsDto';
import { QUALIFIER } from '../../../../constants';

interface IProps {
    maps: MapStatsDto[],
    mapType: string,
    stageType: string,
    setMapType: (value: string) => void
}

const StatsTabs = ({maps, mapType, stageType, setMapType}: IProps) => {
    if (stageType !== QUALIFIER && mapType === QUALIFIER) {
        mapType = '';
    }

    return (  
        <Grid item xs margin='auto' container justifyContent='center'>
            <Tabs sx={{ maxWidth: 600 }}
                variant='scrollable'
                scrollButtons='auto'
                value={mapType}
                onChange={(_, value) => setMapType(value)}
                >
                {stageType === QUALIFIER && 
                <Tab label='seeding' value={QUALIFIER}/>
                }
                <Tab label='mappool' value=''/>
                {maps.map(map => 
                    <Tab 
                        key={map.id} 
                        label={`${map.type}${map.index > 0 ? map.index : ''}`}
                        value={map.id} onClick={() => setMapType(map.type)}
                    />
                )}
            </Tabs>
        </Grid>
    );
}

export default StatsTabs;