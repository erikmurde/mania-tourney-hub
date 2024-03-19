import { Grid, Paper, Tab, Table, TableBody, TableContainer, Tabs } from '@mui/material';
import { IStageDto } from '../../../dto/stage/IStageDto';
import StatsTableHead from './table/StatsTableHead';
import { useEffect, useState } from 'react';
import StatsTableRow from './table/StatsTableRow';
import { MapStatsDto } from '../../../dto/statistics/MapStatsDto';
import { TournamentDto } from '../../../dto/tournament/TournamentDto';
import StatTypeTabs from './tabs/StatTypeTabs';

interface IProps {
    stage: IStageDto,
    mapStats: MapStatsDto[],
    tourney: TournamentDto
}

const StageStats = ({stage, mapStats, tourney}: IProps) => {
    const [showTeams, setShowTeams] = useState(false);

    useEffect(() => {
        setShowTeams(tourney.minTeamSize > 1);
    }, [tourney.id]);

    return (  
        <Grid container direction='column' alignItems='center'>
            <StatTypeTabs
                teamTourney={tourney.minTeamSize > 1}
                showTeams={showTeams}
                setShowTeams={setShowTeams}
            />
            <Grid item>
                <Paper elevation={6} sx={{ height: 1, paddingLeft: 1, paddingRight: 1 }}>
                {tourney.id && 
                <TableContainer>
                    <Table>
                        <StatsTableHead stageType={stage.stageType} showTeams={showTeams}/>
                        <TableBody>
                            {mapStats.map(map => 
                                <StatsTableRow 
                                    key={map.id} 
                                    map={map} 
                                    stageType={stage.stageType}
                                    teamTourney={tourney.minTeamSize > 1}
                                    showTeams={showTeams}/>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>}
                </Paper>
            </Grid>
        </Grid>
    );
}

export default StageStats;