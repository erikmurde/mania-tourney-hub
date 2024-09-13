import { Grid, TableRow, Typography, useTheme } from '@mui/material';
import { UserDtoSimple } from '../../../../dto/user/UserDtoSimple';
import { SchedTableCell } from '../../../styled/SchedTableCell';
import Flag from '../../../Flag';

interface IProps {
    index: number,
    numAdvancing: number,
    stats: {
        player?: UserDtoSimple,
        team?: {name: string, logo: string},
        rankSum: number,
        avgScore: number
    }
}

const SeedingStatsTableRow = ({index, numAdvancing, stats}: IProps) => {
    const theme = useTheme();

    const player = stats.player;
    const team = stats.team;
    const qualified = index <= numAdvancing;
    const lastQualified = index === numAdvancing;

    const color = qualified
        ? theme.palette.text.primary 
        : theme.palette.secondary.dark;

    const borderColor = lastQualified 
        ? theme.palette.secondary.dark
        : 'inherit'

    const border = `1px solid ${borderColor}`

    return (  
        <TableRow sx={{ 
            '&:last-child td, &:last-child th': { border: 0 }, 
            height: 50
        }}>
            <SchedTableCell sx={{ borderBottom: border }}>
                <Typography fontSize={14} color={color}>
                    {index}
                </Typography>
            </SchedTableCell>
            <SchedTableCell sx={{ borderBottom: border }}>
                <Grid container justifyContent='start' alignItems='center'>
                    {player && 
                    <Flag country={player.country}/>}
                    {team &&
                    <Grid item width={30} height={20} xs='auto'>
                        <img 
                            className='flag' 
                            src={team.logo} 
                            alt={`Logo of ${team.name}`}/>
                    </Grid>}
                    <Grid item marginLeft={0.5}>
                        <Typography fontSize={14} color={color}>
                            {player?.name}{team?.name}
                        </Typography>
                    </Grid>
                </Grid>
            </SchedTableCell>
            <SchedTableCell sx={{ borderBottom: border }}>
                <Typography fontSize={14} color={color}>
                    {stats.rankSum}
                </Typography>
            </SchedTableCell>
            <SchedTableCell sx={{ borderBottom: border }}>
                <Typography fontSize={14} color={color}>
                    {stats.avgScore.toLocaleString()}
                </Typography>
            </SchedTableCell>
        </TableRow>
    );
}
 
export default SeedingStatsTableRow;