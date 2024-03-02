import { Grid } from '@mui/material';
import { IUserDto } from '../../../dto/IUserDto';
import PlayerCard from './PlayerCard';

const PlayerList = ({players}: {players: IUserDto[]}) => {
    return (  
        <Grid container spacing={2} justifyContent='center'>
            {players.map(player => 
                <Grid item key={player.id}>
                    <PlayerCard player={player}/>
                </Grid>
            )}
        </Grid>
    );
}

export default PlayerList;