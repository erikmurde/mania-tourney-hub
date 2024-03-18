import { Grid, TableRow, Typography, useTheme } from '@mui/material';
import { EventParticipantDto } from '../../../../dto/user/EventParticipantDto';
import { SchedTableCell } from '../../../styled/SchedTableCell';
import Flag from '../../../Flag';

interface IProps {
    index: number,
    numAdvancing: number,
    playerStats: {
        player: EventParticipantDto,
        rankSum: number,
        avgScore: number
    }
}

const SeedingStatsTableRowPlayer = ({index, numAdvancing, playerStats}: IProps) => {
    const theme = useTheme();
    const player = playerStats.player;
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
                    <Flag country={player.country} marginTop={0}/>
                    <Grid item marginLeft={0.5}>
                        <Typography fontSize={14} color={color}>
                            {player.name}
                        </Typography>
                    </Grid>
                </Grid>
            </SchedTableCell>
            <SchedTableCell sx={{ borderBottom: border }}>
                <Typography fontSize={14} color={color}>
                    {playerStats.rankSum}
                </Typography>
            </SchedTableCell>
            <SchedTableCell sx={{ borderBottom: border }}>
                <Typography fontSize={14} color={color}>
                    {playerStats.avgScore.toLocaleString()}
                </Typography>
            </SchedTableCell>
        </TableRow>
    );
}
 
export default SeedingStatsTableRowPlayer;