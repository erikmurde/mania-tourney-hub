import { Grid, TableRow } from '@mui/material';
import { MapStatsDto } from '../../../../dto/statistics/MapStatsDto';
import { SchedTableCell } from '../../../styled/SchedTableCell';
import MapTypeBox from '../../../MapTypeBox';
import { TournamentDto } from '../../../../dto/tournament/TournamentDto';
import { PlayerScoreDto } from '../../../../dto/score/PlayerScoreDto';
import Flag from '../../../Flag';
import { MapStatsService } from '../../../../services/mapStatsService';
import { QUALIFIER, STANDARD } from '../../../../constants';

interface IProps {
    map: MapStatsDto,
    tourney: TournamentDto,
    stageType: string
}

const StatsTableRow = ({map, tourney, stageType}: IProps) => {
    const service = new MapStatsService();

    const allScores = service.getAllScores(map);
    const allAccs = service.getAllAccs(map);

    const avgScore = allScores.length > 0 
        ? Math.round(allScores.reduce((elem, sum) => sum + elem, 0) / allScores.length)
        : '';

    const avgAcc = allScores.length > 0 
        ? (allAccs.reduce((elem, sum) => sum + elem, 0) / allScores.length).toFixed(2)
        : '';

    const hightestScore = Math.max(...allScores);

    const bestPlayer = (map.scores as PlayerScoreDto[]).find(
        playerScore => playerScore.score === hightestScore
    );

    return (  
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: 50 }}>
            <SchedTableCell width={40} sx={{ paddingRight: 1 }}>
                <MapTypeBox 
                    mapType={map.type} 
                    index={map.index} 
                    height={25} 
                    width={40}
                    fontSize={14}
                    isQualifier={stageType === QUALIFIER}
                />
            </SchedTableCell>
            <SchedTableCell>{map.title}</SchedTableCell>
            <SchedTableCell sx={{ minWidth: 150 }}>
                <Grid container justifyContent='start' alignItems='center'>
                    {bestPlayer && <Flag country={bestPlayer.player.country} marginTop={0}/>}
                    <Grid item marginLeft={0.5}>
                        {bestPlayer ? bestPlayer.player.name : ''}
                    </Grid>
                </Grid>
            </SchedTableCell>
            <SchedTableCell>
                {bestPlayer ? bestPlayer.score.toLocaleString() : ''}
            </SchedTableCell>
            <SchedTableCell>
                {bestPlayer ? bestPlayer.accuracy.toFixed(2) + '%' : ''}
            </SchedTableCell>
            <SchedTableCell>{avgScore.toLocaleString()}</SchedTableCell>
            <SchedTableCell>{avgAcc ? `${avgAcc}%` : ''}</SchedTableCell>
            {stageType === STANDARD && 
            <>
            <SchedTableCell>{map.picked}</SchedTableCell>
            <SchedTableCell>{map.banned}</SchedTableCell>
            <SchedTableCell>{map.protected}</SchedTableCell>
            </>}
        </TableRow>
    );
}

export default StatsTableRow;