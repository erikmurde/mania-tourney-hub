import { Grid } from '@mui/material';
import { UserDto } from '../../../dto/user/UserDto';
import PlayerCard from './PlayerCard';
import { AuthService } from '../../../services/authService';
import { ACTIVE, DISQUALIFIED, ELIMINATED } from '../../../constants';
import NoItems from '../NoItems';

interface IProps {
    playersPublic: boolean,
    players: UserDto[];
    setPlayers: (players: UserDto[]) => void
}

const PlayerList = ({playersPublic, players, setPlayers}: IProps) => {

    const eliminatePlayer = async(player: UserDto) => {
        const activePlayers = players
            .filter(player => player.stats[0].status === ACTIVE);

        const stats = player.stats[0];
        
        stats.status = playersPublic ? ELIMINATED : DISQUALIFIED;
        stats.placement = playersPublic ? activePlayers.length + 1 : 0;

        await new AuthService().edit(player.id, player);
        setPlayers(players.map(existing => 
            existing.id === player.id ? player : existing
        ));
    }

    return (  
        <Grid container spacing={2} justifyContent='center'>
            {players.length === 0 && <NoItems name='players'/>}
            {players.map(player => 
                <Grid item key={player.id}>
                    <PlayerCard playersPublic={playersPublic} player={player} eliminatePlayer={eliminatePlayer}/>
                </Grid>
            )}
        </Grid>
    );
}

export default PlayerList;