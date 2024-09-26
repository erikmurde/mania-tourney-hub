import { Grid, Tab, Tabs } from '@mui/material';
import { MapStatsDto } from '../../../../dto/statistics/MapStatsDto';
import { MAPPOOL, QUALIFIER, SEEDING } from '../../../../constants';

interface IProps {
    maps: MapStatsDto[],
    stageType: string,
    selectedStats: string,
    setSelectedStats: (value: string) => void
}

const StatsTabs = ({maps, stageType, selectedStats, setSelectedStats}: IProps) => {
    if (stageType !== QUALIFIER && selectedStats === SEEDING) {
        selectedStats = MAPPOOL;
    }

    return (  
        <Grid item xs margin='auto' container justifyContent='center'>
            <Tabs sx={{ maxWidth: 600 }}
                variant='scrollable'
                scrollButtons='auto'
                value={selectedStats}
                onChange={(_, value) => setSelectedStats(value)}
                >
                {stageType === QUALIFIER && 
                <Tab label={SEEDING} value={SEEDING}/>
                }
                <Tab label={MAPPOOL} value={MAPPOOL}/>
                {maps.map(map => 
                    <Tab 
                        key={map.id} 
                        label={`${map.type}${map.index > 0 ? map.index : ''}`}
                        value={map.id} onClick={() => setSelectedStats(map.id)}
                    />
                )}
            </Tabs>
        </Grid>
    );
}

export default StatsTabs;