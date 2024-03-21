import { Button, Grid, Typography, useTheme } from '@mui/material'

const Hero = () => {
    const theme = useTheme();

    return (  
        <Grid item container height={500} direction='column' className='flex-center home-banner'>
            <Grid item marginBottom={1}>
                <Typography variant='h2' textAlign='center' 
                    fontSize={50}
                    color={theme.palette.text.primary}
                    sx={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.8)' }}
                    >
                    Welcome to the osu!mania tournament hub
                </Typography>
            </Grid>
            <Grid item width={0.6} marginBottom={2}>
                <Typography 
                    color={theme.palette.text.primary} 
                    textAlign='center'
                    sx={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.8)' }}
                    >
                    The osu!mania tournament hub makes creating, managing and following tournaments easier than ever.
                    Forget about learning spreadsheets and spending hours importing or formatting data.
                    Create a new tournament now or easily follow ongoing and past tournaments.
                </Typography>
            </Grid>
            <Grid item>
                <Button variant='contained' sx={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                    Create new tournament
                </Button>
            </Grid>
        </Grid>
    );
}

export default Hero;