import { TableRow, Grid } from '@mui/material';
import { SchedTableCell } from '../../../styled/SchedTableCell';
import { TeamScoreDto } from '../../../../dto/score/TeamScoreDto';
import { MapStatsService } from '../../../../services/mapStatsService';

interface IProps {
    index: number,
    stats: TeamScoreDto
}

const MapStatsTableRowTeam = ({index, stats}: IProps) => {
    const service = new MapStatsService();

    return (  
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: 50 }}>
            <SchedTableCell>{index}</SchedTableCell>
            <SchedTableCell>
                <Grid container justifyContent='start' alignItems='center'>
                    <Grid item width={30} height={20} xs='auto'>
                        <img 
                            className='flag' 
                            src={stats.logo} 
                            alt={`Logo of ${stats.name}`}/>
                    </Grid>
                    <Grid item marginLeft={0.5}>
                        {stats.name}
                    </Grid>
                </Grid>
            </SchedTableCell>
            <SchedTableCell>
                {service.getTeamScore(stats).toLocaleString()}
            </SchedTableCell>
            <SchedTableCell>
                {service.getTeamAcc(stats).toFixed(2)}%
            </SchedTableCell>
        </TableRow>
    );
}

export default MapStatsTableRowTeam;