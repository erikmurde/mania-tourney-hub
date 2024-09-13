import { Divider, Grid, Typography, useTheme } from '@mui/material';
import { TeamDtoSimple } from '../../../../dto/team/TeamDtoSimple';
import RefSheetPlayerBox from '../../../RefSheetPlayerBox';
import CopyClipboard from '../CopyClipboard';

const TeamInvites = ({team}: {team: TeamDtoSimple}) => {
    const theme = useTheme();

    const sortPlayers = () => {
        return [
            team.players.find(player => player.isCaptain)!,
            ...team.players.filter(player => !player.isCaptain)
        ];
    }

    return (  
        <Grid container direction='column'>
            <Grid item marginBottom={1}>
                <RefSheetPlayerBox name={team.name} bgColor={theme.palette.primary.main}/>
            </Grid>
            {sortPlayers().map((player, index) => 
                <Grid item container key={index} height={50} alignItems='center'>
                    <Grid item xs={12}>
                        <Divider/> 
                    </Grid>
                    <Grid item width={70} paddingLeft={0.5}>
                        <Typography fontSize={14} fontWeight={500}>
                            {player.isCaptain ? 'Captain' : `Player ${index + 1}`}
                        </Typography>
                    </Grid>
                    <Grid item width={40}>
                        <CopyClipboard text={`!mp invite ${player.name}`}/>
                    </Grid>
                    <Grid item>
                        <Typography fontSize={14}>
                            !mp invite {player.name}
                        </Typography>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
}
 
export default TeamInvites;