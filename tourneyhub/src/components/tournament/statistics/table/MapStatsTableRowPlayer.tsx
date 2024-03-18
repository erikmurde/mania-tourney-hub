import { Grid, TableRow } from '@mui/material';
import { PlayerScoreDto } from '../../../../dto/score/PlayerScoreDto';
import { SchedTableCell } from '../../../styled/SchedTableCell';
import Flag from '../../../Flag';

interface IProps {
    index: number,
    playerScore: PlayerScoreDto
}

const MapStatsTableRowPlayer = ({index, playerScore}: IProps) => {
    const player = playerScore.player;

    return (  
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: 50 }}>
            <SchedTableCell>{index}</SchedTableCell>
            <SchedTableCell>
                <Grid container justifyContent='start' alignItems='center'>
                    <Flag country={player.country} marginTop={0}/>
                    <Grid item marginLeft={0.5}>
                        {player.name}
                    </Grid>
                </Grid>
            </SchedTableCell>
            <SchedTableCell>{playerScore.score.toLocaleString()}</SchedTableCell>
            <SchedTableCell>{playerScore.accuracy.toFixed(2)}%</SchedTableCell>
        </TableRow>
    );
}

export default MapStatsTableRowPlayer;