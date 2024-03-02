import { Grid, Paper, Typography } from '@mui/material';
import PlayerList from '../../../components/tournament/players/PlayerList';
import { IUserDto } from '../../../dto/IUserDto';
import { useEffect, useState } from 'react';
import { AuthService } from '../../../services/authService';
import { useParams } from 'react-router-dom';

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
                <Grid marginLeft={5} item xs={12}>
                    <Typography variant='h2' 
                        height={100} 
                        fontSize={46} 
                        fontWeight={400} 
                        lineHeight={2}>
                        Players
                    </Typography>
                </Grid>
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