import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { MapStatsDto } from '../../../dto/statistics/MapStatsDto';
import { MapStatsService } from '../../../services/mapStatsService';
import MapStatsTableRowPlayer from './table/MapStatsTableRowPlayer';
import { PlayerScoreDto } from '../../../dto/score/PlayerScoreDto';
import { SchedTableCell } from '../../styled/SchedTableCell';

const MapStats = ({map}: {map: MapStatsDto}) => {
    const service = new MapStatsService();
    
    const allScores = service.getAllScores(map);
    const allAccs = service.getAllAccs(map);

    const avgScore = allScores.length > 0 
    ? Math.round(allScores.reduce((elem, sum) => sum + elem, 0) / allScores.length).toFixed(2)
    : '';

    const avgAcc = allScores.length > 0 
        ? (allAccs.reduce((elem, sum) => sum + elem, 0) / allScores.length).toFixed(2)
        : '';

    return (  
        <Paper elevation={6} sx={{ height: 1, paddingLeft: 1, paddingRight: 1, width: 540 }}>
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
                    Average acc - <span style={{ fontWeight: 700 }}>{avgAcc}%</span>
                </Grid>
                <Grid item xs={11} marginTop={2}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <SchedTableCell>#</SchedTableCell>
                                    <SchedTableCell>Player</SchedTableCell>
                                    <SchedTableCell width={70}>Score</SchedTableCell>
                                    <SchedTableCell width={70}>Acc</SchedTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(map.scores as PlayerScoreDto[]).map((playerScore, index) => 
                                    <MapStatsTableRowPlayer
                                        key={playerScore.player.name}
                                        index={index + 1}
                                        playerScore={playerScore}
                                    />
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}
 
export default MapStats;