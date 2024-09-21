import { Grid, Paper } from '@mui/material';
import PlayerList from '../../../components/tournament/players/PlayerList';
import { UserDto } from '../../../dto/user/UserDto';
import { useContext, useEffect, useState } from 'react';
import { AuthService } from '../../../services/authService';
import SectionTitle from '../../../components/tournament/SectionTitle';
import ConfirmationDialog from '../../../components/tournament/dialog/ConfirmationDialog';
import { Publish } from '@mui/icons-material';
import { TournamentService } from '../../../services/tournamentService';
import { DISQUALIFIED, ACTIVE, ADMIN, HOST } from '../../../constants';
import { AuthContext } from '../../Root';
import { useTourney } from '../TournamentHeader';

const Players = () => {
    const { tourney } = useTourney();
    const { user } = useContext(AuthContext);
    const [players, setPlayers] = useState([] as UserDto[]);
    const validRoles = [HOST, ADMIN];
    const tourneyService = new TournamentService();
    const authService = new AuthService();

    const isValid = user && user.roles
        .filter(role => role.tournamentId === tourney.id)
        .some(role => validRoles.includes(role.name));

    useEffect(() => {
        authService
            .getPlayers(tourney.id)
            .then(players => setPlayers(isValid 
                ? players 
                : players.filter(player => player.stats[0].status !== DISQUALIFIED))
            );
    }, [tourney.id]);

    const publishPlayers = async() => {
        const newPlayers = [...players];
        tourney.participantsPublic = true;

        for (const player of newPlayers) {
            let stats = player.stats[0];

            if (stats.status !== DISQUALIFIED) {
                stats.status = ACTIVE;
                await authService.edit(player.id, player);
            }
        }
        await tourneyService.edit(tourney.id, tourney);
        setPlayers(newPlayers);
    }

    return (  
        <Paper elevation={2} sx={{ minHeight: 500, paddingBottom: 2 }}>
            <Grid container marginBottom={5}>
                <SectionTitle title='Players'/>
                {isValid && !tourney.participantsPublic && 
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
                <Grid item xs={12}>
                    <PlayerList 
                        playersPublic={tourney.participantsPublic}
                        players={players.sort((a, b) => 
                            a.stats[0].seed - b.stats[0].seed
                        )}
                        setPlayers={setPlayers}/>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Players;