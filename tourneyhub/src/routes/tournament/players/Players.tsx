import { Grid, Paper } from '@mui/material';
import PlayerList from '../../../components/tournament/players/PlayerList';
import { UserDto } from '../../../dto/user/UserDto';
import { useContext, useEffect, useState } from 'react';
import SectionTitle from '../../../components/tournament/SectionTitle';
import ConfirmationDialog from '../../../components/tournament/dialog/ConfirmationDialog';
import { Publish } from '@mui/icons-material';
import { DISQUALIFIED, ADMIN, HOST, ACTIVE } from '../../../constants';
import { AuthContext } from '../../Root';
import { useTourney } from '../TournamentHeader';
import { TournamentService } from '../../../services/tournamentService';
import { AuthService } from '../../../services/authService';
import NoItems from '../../../components/tournament/NoItems';

const Players = () => {
    const { tourney } = useTourney();
    const { user } = useContext(AuthContext);

    const [players, setPlayers] = useState([] as UserDto[]);
    const [loading, setLoading] = useState(true);

    const validRoles = [HOST, ADMIN];
    const tourneyService = new TournamentService();
    const authService = new AuthService();

    const isValid = user && user.roles
        .filter(tourneyRole => tourneyRole.tournamentId === tourney.id)
        .some(tourneyRole => validRoles.includes(tourneyRole.role));

    const getStats = (player: UserDto) => player.stats.find(stats => stats.tournamentId === tourney.id)!;

    useEffect(() => {
        authService
            .getTournamentPlayers(tourney.id)
            .then(players => setPlayers(isValid 
                ? players 
                : players.filter(player => getStats(player).status !== DISQUALIFIED))
            )
            .finally(() => setLoading(false));
    }, [tourney.id]);

    const publishPlayers = async() => {
        await tourneyService.publishPlayers(tourney.id);
        updateState();
    }

    const updateState = () => {
        const newPlayers = [...players];
        tourney.playersPublished = true;

        for (const player of newPlayers) {
            let stats = player.stats.find(stats => stats.tournamentId === tourney.id)!;

            if (stats.status !== DISQUALIFIED) {
                stats.status = ACTIVE;
            }
        }
        setPlayers(newPlayers);
    }

    return (  
        <Paper elevation={2} sx={{ minHeight: 800, paddingBottom: 2 }}>
            <Grid container marginBottom={5}>
                <SectionTitle title='Players'/>
                {isValid && !tourney.playersPublished && 
                <Grid item xs={12} margin={5} marginTop={2}>
                    <ConfirmationDialog
                        btnProps={{ 
                            title: 'Publish', 
                            startIcon: <Publish/>, 
                            sx: { width: 150 }
                        }}
                        title={'Are you sure you wish to publish the players list?'} 
                        actionTitle={'Publish'} 
                        action={() => publishPlayers()}/>
                </Grid>}
                <Grid item xs={12} minHeight={400}>
                    <NoItems name='players' loading={loading} display={players.length === 0}/>
                    <PlayerList 
                        playersPublic={tourney.playersPublished}
                        players={players.sort((a, b) => 
                            tourneyService.compareSeeds(getStats(a).seed, getStats(b).seed) || a.rank - b.rank
                        )}
                        setPlayers={setPlayers}/>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Players;