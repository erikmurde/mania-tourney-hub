import { Grid } from '@mui/material';
import { UserDto } from '../../../dto/user/UserDto';
import PlayerCard from './PlayerCard';
import { ACTIVE, ELIMINATED } from '../../../constants';
import { TournamentService } from '../../../services/tournamentService';
import { useTourney } from '../../../routes/tournament/TournamentHeader';
import { useContext } from 'react';
import { AuthContext, ErrorContext } from '../../../routes/Root';

interface IProps {
    playersPublic: boolean,
    players: UserDto[];
    setPlayers: (players: UserDto[]) => void
}

const PlayerList = ({playersPublic, players, setPlayers}: IProps) => {
    const { updateUser } = useContext(AuthContext)
    const { setError } = useContext(ErrorContext);
    const { tourney } = useTourney();

    const eliminatePlayer = async(player: UserDto) => {
        const error = await new TournamentService().eliminatePlayer(tourney.id, player.id, false);

        if (error) {
            return setError(error);
        }
        updateState(player);
    }

    const getStats = (player: UserDto) => player.stats.find(stats => stats.tournamentId === tourney.id)!;

    const updateState = (player: UserDto) => {
        if (!playersPublic) {
            updateUser();
            return setPlayers(players.filter(existing => existing.id !== player.id));
        }
        const stats = getStats(player);
        
        stats.status = ELIMINATED;
        stats.placement = players.filter(player => getStats(player).status === ACTIVE).length;

        setPlayers(players.map(existing => 
            existing.id === player.id ? player : existing
        ));
    }

    return (  
        <Grid container spacing={2} justifyContent='center'>
            {players.map(player => 
                <Grid item key={player.id}>
                    <PlayerCard playersPublic={playersPublic} player={player} eliminatePlayer={eliminatePlayer}/>
                </Grid>
            )}
        </Grid>
    );
}

export default PlayerList;