
import { Grid, useTheme } from '@mui/material';
import { SchedTableCell } from '../../../../styled/SchedTableCell';
import { EventParticipantDto } from '../../../../../dto/EventParticipantDto';
import Flag from '../../../../Flag';

interface IProps {
    player: EventParticipantDto,
    winner: boolean,
    matchDone: boolean,
    right?: boolean
}

const MatchRowPlayer = ({player, winner, matchDone, right}: IProps) => {
    const theme = useTheme();

    const color = matchDone 
        ?   (winner ? theme.palette.text.primary : theme.palette.text.secondary) 
        :   theme.palette.text.primary;

    return (  
        <SchedTableCell sx={{ paddingLeft: right ? 0 : 0.5, paddingRight: right ? 0.5 : 0 }}
            >
            <Grid container justifyContent={right ? 'start' : 'end'}>
                {right && <Flag country={player.country} marginTop={0}/>}
                <Grid item 
                    marginRight={right ? 0 : 0.5} 
                    marginLeft={right ? 0.5 : 0}
                    sx={{ fontWeight: winner ? 700 : 400}}
                    color={color}
                    >
                    {player.name}
                </Grid>
                {!right && <Flag country={player.country} marginTop={0}/>}
            </Grid>
        </SchedTableCell>
    );
}

export default MatchRowPlayer;