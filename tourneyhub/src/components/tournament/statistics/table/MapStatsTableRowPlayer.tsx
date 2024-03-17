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
    const scores = playerScore.scores;

    return (  
        <>
        {scores.map((score, currentIndex) =>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: 50 }}>
                <SchedTableCell>{index + currentIndex}</SchedTableCell>
                <SchedTableCell>
                    <Grid container justifyContent='start' alignItems='center'>
                        <Flag country={player.country} marginTop={0}/>
                        <Grid item marginLeft={0.5}>
                            {player.name}
                        </Grid>
                    </Grid>
                </SchedTableCell>
                <SchedTableCell>{score.score.toLocaleString()}</SchedTableCell>
                <SchedTableCell>{score.accuracy.toFixed(2)}%</SchedTableCell>
            </TableRow> 
        )}
        </>
    );
}
 
export default MapStatsTableRowPlayer;