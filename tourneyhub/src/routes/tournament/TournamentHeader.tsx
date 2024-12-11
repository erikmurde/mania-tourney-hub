import { Box, Grid, Paper } from '@mui/material';
import { Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { TournamentDto } from '../../dto/tournament/TournamentDto';
import { useContext, useEffect, useState } from 'react';
import { TournamentService } from '../../services/tournamentService';
import HeaderText from '../../components/tournament/header/HeaderText';
import HeaderButtons from '../../components/tournament/header/HeaderButtons';
import HeaderTabs from '../../components/tournament/header/HeaderTabs';
import { NUM_REGEX } from '../../constants';
import { ErrorContext } from '../Root';

export function useTourney() {
    return useOutletContext<{ tourney: TournamentDto }>();
}

const TournamentHeader = () => {
    const { id } = useParams();
    const { setError } = useContext(ErrorContext);
    const [tourney, setTourney] = useState(null as TournamentDto | null);
    const [tourneyUpdate, setTourneyUpdate] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id || !id.match(NUM_REGEX)) {
            return;
        }
        const service = new TournamentService();

        service
            .getEntity(id)
            .then(response => {
                if (service.isErrorResponse(response)) {
                    setError(response);
                } else {
                    setTourney(response);
                }
            });
        window.scrollTo(0, 0);
    }, [id, tourneyUpdate]);

    const updateTourney = () => {
        setTourneyUpdate(tourneyUpdate + 1);
        navigate(`/tournaments/${id}/information`);
    }

    if (!tourney) {
        return <></>;
    }

    return (
        <Grid container direction='column' rowSpacing={2}>
            <Grid item>
                <Paper elevation={2}>
                    <Box height={350}>
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