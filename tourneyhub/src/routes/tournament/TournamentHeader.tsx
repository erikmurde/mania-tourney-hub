import { Box, Grid, Paper } from '@mui/material';
import { Outlet, useParams } from 'react-router-dom';
import { ITournamentDto } from '../../dto/tournament/ITournamentDto';
import { useEffect, useState } from 'react';
import { TournamentService } from '../../services/tournamentService';
import HeaderText from '../../components/tournament/header/HeaderText';
import HeaderButtons from '../../components/tournament/header/HeaderButtons';
import HeaderTabs from '../../components/tournament/header/HeaderTabs';

const TournamentHeader = () => {
    const [tourney, setTourney] = useState({} as ITournamentDto);
    const { id } = useParams();

    useEffect(() => {
        new TournamentService().getEntity(id!)
            .then(tourney => setTourney(tourney));
    }, [id]);

    return (
        <Grid container direction='column' rowSpacing={2}>
            <Grid item>
                <Paper elevation={2} sx={{ height: 766 }}>
                    <Box height={400}>
                        <img src={tourney.banner} id='tourney-banner' alt='Tournament banner'/>
                    </Box>
                    <HeaderText name={tourney.name} description={tourney.description}/>
                    <HeaderButtons tourney={tourney}/>
                    <HeaderTabs tourney={tourney}/>
                </Paper>
            </Grid>
            <Grid item>
                <Outlet/>
            </Grid>
        </Grid>
    );
}

export default TournamentHeader;