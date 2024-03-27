import { Grid } from '@mui/material';
import { TeamPlayerDto } from '../../../dto/team/TeamPlayerDto';
import NoItems from '../NoItems';
import TeamPlayerCard from './TeamPlayerCard';

const TeamPlayerList = ({players}: {players: TeamPlayerDto[]}) => {
    return (  
        <Grid container spacing={2} justifyContent='center'>
            {players.length === 0 && <NoItems name='players'/>}
            {players.map(player => 
                <Grid item key={player.id}>
                    <TeamPlayerCard player={player} isSeparate/>
                </Grid>
            )}
        </Grid>
    );
}

export default TeamPlayerList;