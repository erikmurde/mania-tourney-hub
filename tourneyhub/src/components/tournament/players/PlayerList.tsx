import { Grid } from '@mui/material';
import { UserDto } from '../../../dto/user/UserDto';
import PlayerCard from './PlayerCard';
import { ACTIVE, DISQUALIFIED, ELIMINATED } from '../../../constants';
import { TournamentService } from '../../../services/tournamentService';
import { useTourney } from '../../../routes/tournament/TournamentHeader';

interface IProps {
    playersPublic: boolean,
    players: UserDto[];
    setPlayers: (players: UserDto[]) => void
}

const PlayerList = ({playersPublic, players, setPlayers}: IProps) => {
    const { tourney } = useTourney();

    const eliminatePlayer = async(player: UserDto) => {
        await new TournamentService().eliminatePlayer(tourney.id, player.id, false);
        updateState(player);
    }

    const getStats = (player: UserDto) => player.stats.find(stats => stats.tournamentId === tourney.id)!;

    const updateState = (player: UserDto) => {
        const activePlayers = players.filter(player => getStats(player).status === ACTIVE);
        const stats = getStats(player);
        
        stats.status = playersPublic ? ELIMINATED : DISQUALIFIED;
        stats.placement = playersPublic ? activePlayers.length : 0;

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