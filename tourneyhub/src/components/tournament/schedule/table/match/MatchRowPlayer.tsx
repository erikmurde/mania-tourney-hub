import { Grid, useTheme } from '@mui/material';
import { SchedTableCell } from '../../../../styled/SchedTableCell';
import { UserDtoSimple } from '../../../../../dto/user/UserDtoSimple';
import Flag from '../../../../Flag';
import { TeamDtoSimple } from '../../../../../dto/team/TeamDtoSimple';
import Logo from '../../../Logo';

interface IProps {
    player: UserDtoSimple | TeamDtoSimple,
    winner: boolean,
    matchDone: boolean,
    right?: boolean
}

const MatchRowPlayer = ({player, winner, matchDone, right}: IProps) => {
    const theme = useTheme();

    const color = matchDone 
        ?   (winner ? theme.palette.text.primary : theme.palette.text.secondary) 
        :   theme.palette.text.primary;

    const logo = 'players' in player 
        ? <Logo name={player.name} link={player.logo}/> 
        : <Flag country={player.country}/>;

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