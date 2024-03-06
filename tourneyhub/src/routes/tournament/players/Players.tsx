import { Grid, Paper, Typography } from '@mui/material';
import PlayerList from '../../../components/tournament/players/PlayerList';
import { IUserDto } from '../../../dto/IUserDto';
import { useEffect, useState } from 'react';
import { AuthService } from '../../../services/authService';
import { useParams } from 'react-router-dom';
import SectionTitle from '../../../components/tournament/SectionTitle';

const Players = () => {
    const { id } = useParams();
    const [players, setPlayers] = useState([] as IUserDto[]);

    useEffect(() => {
        if (id) {
            new AuthService()
                .getPlayers(id)
                .then(players => setPlayers(players));
        }
    }, [id]);

    return (  
        <Paper elevation={2} sx={{ minHeight: 500, paddingBottom: 2 }}>
            <Grid container marginBottom={5}>
                <SectionTitle title='Players'/>
                <Grid item>
                    <PlayerList 
                        players={players.sort((a, b) => 
                            a.stats[0].seeding - b.stats[0].seeding
                        )}
                        setPlayers={setPlayers}/>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Players;