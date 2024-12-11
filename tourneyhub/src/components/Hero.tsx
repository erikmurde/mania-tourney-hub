import { Button, Grid, Typography, useTheme } from '@mui/material'
import TournamentCreateForm from './tournament/form/TournamentCreateForm';
import { LOGIN_URL } from '../constants';
import video from '../assets/hero-video.webm';

const Hero = ({isLoggedIn}: {isLoggedIn: boolean}) => {
    const theme = useTheme();

    return (  
        <Grid item container height={500} overflow='hidden'>
            <video autoPlay muted loop id='hero-video'>
                <source src={video} type='video/webm'/>
            </video>
            <Grid item direction='column' className='flex-center' id='hero-container'>
                <Grid item marginBottom={1}>
                    <Typography variant='h2' textAlign='center' 
                        fontSize={50}
                        fontWeight={400}
                        color={theme.palette.text.primary}>
                        Welcome to the osu!mania tournament hub
                    </Typography>
                </Grid>
                <Grid item marginBottom={3} width={0.52}>
                    <Typography 
                        fontWeight={500}
                        color={theme.palette.text.primary} 
                        textAlign='center'>
                        The osu!mania tournament hub makes organizing and managing tournaments easier than ever.
                        Spend less valuable time on studying spreadsheets or manually moving and formatting data.
                        Organize a new tournament now or easily monitor ongoing and past tournaments.
                    </Typography>
                </Grid>
                <Grid item>
                    {isLoggedIn 
                    ?   <TournamentCreateForm/>
                    :   <Button variant='contained'
                            onClick={() => window.location.assign(LOGIN_URL)}>
                            Login to get started
                        </Button>}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Hero;