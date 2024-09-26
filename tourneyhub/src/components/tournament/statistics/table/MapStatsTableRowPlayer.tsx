import { Grid, TableRow } from '@mui/material';
import { SchedTableCell } from '../../../styled/SchedTableCell';
import Flag from '../../../Flag';
import { PlayerScoreDto } from '../../../../dto/statistics/PlayerScoreDto';

interface IProps {
    index: number,
    stats: PlayerScoreDto
}

const MapStatsTableRowPlayer = ({index, stats}: IProps) => {
    const player = stats.player;

    return (  
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: 50 }}>
            <SchedTableCell>{index}</SchedTableCell>
            <SchedTableCell>
                <Grid container justifyContent='start' alignItems='center'>
                    <Flag country={player.country}/>
                    <Grid item marginLeft={0.5}>
                        {player.name}
                    </Grid>
                </Grid>
            </SchedTableCell>
            <SchedTableCell>{stats.score.toLocaleString()}</SchedTableCell>
            <SchedTableCell>{stats.accuracy.toFixed(2)}%</SchedTableCell>
        </TableRow>
    );
}

export default MapStatsTableRowPlayer;