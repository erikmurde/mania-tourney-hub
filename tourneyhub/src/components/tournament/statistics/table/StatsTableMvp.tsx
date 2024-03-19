import { Grid } from '@mui/material';
import Flag from '../../../Flag';
import { SchedTableCell } from '../../../styled/SchedTableCell';
import { PlayerScoreDto } from '../../../../dto/score/PlayerScoreDto';
import { TeamScoreDto } from '../../../../dto/score/TeamScoreDto';
import { MapStatsService } from '../../../../services/mapStatsService';

interface IProps {
    bestPlayer: PlayerScoreDto | null,
    bestTeam: TeamScoreDto | null
}

const StatsTableMvp = ({bestPlayer, bestTeam}: IProps) => {
    const service = new MapStatsService();

    let score = '';
    let accuracy = '';

    if (bestPlayer) {
        score = bestPlayer.score.toLocaleString();
        accuracy = bestPlayer.accuracy.toFixed(2);
    } else if (bestTeam) {
        score = service.getTeamScore(bestTeam).toLocaleString();
        accuracy = service.getTeamAcc(bestTeam).toFixed(2);
    }

    return (
        <>
        <SchedTableCell sx={{ minWidth: 150 }}>
            <Grid container justifyContent='start' alignItems='center'>
                {bestPlayer && 
                <>
                <Flag country={bestPlayer.player.country} marginTop={0}/>
                <Grid item marginLeft={0.5}>
                    {bestPlayer.player.name}
                </Grid>
                </>}
                {bestTeam && 
                <>
                <Grid item width={30} height={20} xs='auto'>
                    <img 
                        className='flag' 
                        src={bestTeam.logo} 
                        alt={`Logo of ${bestTeam.name}`}/>
                </Grid>
                <Grid item marginLeft={0.5}>
                    {bestTeam.name}
                </Grid>
                </>}   
            </Grid>
        </SchedTableCell>
        <SchedTableCell>{score}</SchedTableCell>
        <SchedTableCell>{accuracy ? `${accuracy}%` : ''}</SchedTableCell>
        </>
    );
}

export default StatsTableMvp;