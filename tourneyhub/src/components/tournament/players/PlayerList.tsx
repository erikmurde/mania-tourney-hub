import { Grid } from '@mui/material';
import { IUserDto } from '../../../dto/IUserDto';
import PlayerCard from './PlayerCard';
import { AuthService } from '../../../services/authService';

interface IProps {
    players: IUserDto[];
    setPlayers: (players: IUserDto[]) => void
}

const PlayerList = ({players, setPlayers}: IProps) => {

    const eliminatePlayer = async(player: IUserDto) => {
        const activePlayers = players
            .filter(player => player.stats[0].status === 'active');

        const stats = player.stats[0];
        
        stats.status = 'eliminated';
        stats.placement = activePlayers.length + 1;

        await new AuthService().edit(player.id, player);
        setPlayers(players.map(existing => 
            existing.id === player.id ? player : existing
        ));
    }

    return (  
        <Grid container spacing={2} justifyContent='center'>
            {players.map(player => 
                <Grid item key={player.id}>
                    <PlayerCard player={player} eliminatePlayer={eliminatePlayer}/>
                </Grid>
            )}
        </Grid>
    );
}

export default PlayerList;