import { Grid, useTheme } from '@mui/material';
import { SchedTableCell } from '../../../../styled/SchedTableCell';
import Logo from '../../../Logo';
import { MatchPlayerDto } from '../../../../../dto/schedule/match/MatchPlayerDto';

interface IProps {
    player: MatchPlayerDto,
    winner: boolean,
    matchDone: boolean,
    right?: boolean
}

const MatchRowPlayer = ({player, winner, matchDone, right}: IProps) => {
    const theme = useTheme();

    const color = matchDone 
        ?   (winner ? theme.palette.text.primary : theme.palette.text.secondary) 
        :   theme.palette.text.primary;

    const logo = <Logo name={player.name} link={player.logo}/>;

    return (  
        <SchedTableCell sx={{ paddingLeft: right ? 0 : 0.5, paddingRight: right ? 0.5 : 0 }}
            >
            <Grid container justifyContent={right ? 'start' : 'end'}>
                {right && logo}
                <Grid item
                    marginRight={right ? 0 : 0.5} 
                    marginLeft={right ? 0.5 : 0}
                    sx={{ fontWeight: winner ? 700 : 400}}
                    color={color}
                    >
                    {player.name}
                </Grid>
                {!right && logo}
            </Grid>
        </SchedTableCell>
    );
}

export default MatchRowPlayer;