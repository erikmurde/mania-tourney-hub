import { Box, Grid, Paper } from '@mui/material';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';
import { TournamentDto } from '../../dto/tournament/TournamentDto';
import { useEffect, useState } from 'react';
import { TournamentService } from '../../services/tournamentService';
import HeaderText from '../../components/tournament/header/HeaderText';
import HeaderButtons from '../../components/tournament/header/HeaderButtons';
import HeaderTabs from '../../components/tournament/header/HeaderTabs';
import { NUM_REGEX } from '../../constants';

export function useTourney() {
    return useOutletContext<{ tourney: TournamentDto }>();
}

const TournamentHeader = () => {
    const [tourney, setTourney] = useState(null as TournamentDto | null);
    const [tourneyUpdate, setTourneyUpdate] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        if (!id || !id.match(NUM_REGEX)) {
            return;
        }
        new TournamentService()
            .getEntity(id)
            .then(tourney => setTourney(tourney));
    
        window.scrollTo(0, 0);
    }, [id, tourneyUpdate]);

    const updateTourney = () => {
        setTourneyUpdate(tourneyUpdate + 1);
    }

    if (!tourney) {
        return <></>;
    }

    return (
        <Grid container direction='column' rowSpacing={2}>
            <Grid item>
                <Paper elevation={2} sx={{ height: 766 }}>
                    <Box height={400}>
                        <img src={tourney.banner} id='tourney-banner' alt='Tournament banner'/>
                    </Box>
                    <HeaderText name={tourney.name} description={tourney.description}/>
                    <HeaderButtons tourney={tourney} updateTourney={updateTourney}/>
                    <HeaderTabs tourney={tourney}/>
                </Paper>
            </Grid>
            <Grid item>
                <Outlet context={{ tourney }}/>
            </Grid>
        </Grid>
    );
}

export default TournamentHeader;