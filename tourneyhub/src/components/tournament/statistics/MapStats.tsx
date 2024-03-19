import { Grid, Paper, Typography } from '@mui/material';
import { MapStatsDto } from '../../../dto/statistics/MapStatsDto';
import { MapStatsService } from '../../../services/mapStatsService';
import { PlayerScoreDto } from '../../../dto/score/PlayerScoreDto';
import { useState } from 'react';
import StatTypeTabs from './tabs/StatTypeTabs';
import MapStatsTable from './table/MapStatsTable';
import { TeamScoreDto } from '../../../dto/score/TeamScoreDto';
import NoItems from '../NoItems';

interface IProps {
    map: MapStatsDto,
    teamTourney: boolean
}

const MapStats = ({map, teamTourney}: IProps) => {
    const service = new MapStatsService();
    const [showTeams, setShowTeams] = useState(teamTourney);

    const getAverage = (items: number[], round: boolean) => {
        const average = items.reduce((elem, sum) => sum + elem, 0) / items.length || 0;
        return round ? Math.round(average) : average;
    }

    const getTeamScores = () => {
        return (map.scores as TeamScoreDto[]).sort((a, b) => 
            service.getTeamScore(b) - service.getTeamScore(a)
        );
    }

    const getPlayerScores = () => {
        return teamTourney 
            ? (map.scores as TeamScoreDto[])
                .map(team => team.players)
                .flat()
                .sort((a, b) => b.score - a.score)
            : (map.scores as PlayerScoreDto[]).sort((a, b) => b.score - a.score);
    }
    
    const allScores = service.getAllScores(map, teamTourney, showTeams);
    const allAccs = service.getAllAccs(map, teamTourney, showTeams);

    const avgScore = getAverage(allScores, true);
    const avgAcc = getAverage(allAccs, false);

    const scores = teamTourney && showTeams 
        ? getTeamScores() 
        : getPlayerScores();

    return (  
        <Grid container direction='column' alignItems='center'>
            <StatTypeTabs
                teamTourney={teamTourney}
                showTeams={showTeams}
                setShowTeams={setShowTeams}
            />
            <Grid item>
                {scores.length > 0 &&
                <Paper elevation={6} sx={{ paddingLeft: 1, paddingRight: 1, width: 540 }}>
                    <Grid container justifyContent='center'>
                        <Grid item xs={12} marginTop={2} marginBottom={2}>
                            <Typography textAlign='center'>
                            {map.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign='center' fontSize={14}>
                            Average score - <span style={{ fontWeight: 700 }}>{avgScore.toLocaleString()}</span>
                        </Grid>
                        <Grid item xs={6} textAlign='center' fontSize={14}>
                            Average acc - <span style={{ fontWeight: 700 }}>{avgAcc.toFixed(2)}%</span>
                        </Grid>
                        <Grid item xs={11} marginTop={2}>
                            <MapStatsTable 
                                showTeams={showTeams} 
                                scores={scores}/>
                        </Grid>
                    </Grid>
                </Paper>}
                {scores.length === 0 && 
                <NoItems name={showTeams ? 'team scores' : 'player scores'}/>}
            </Grid>
        </Grid>
    );
}

export default MapStats;