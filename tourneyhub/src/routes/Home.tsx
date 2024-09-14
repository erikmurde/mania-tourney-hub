import { ExpandMore, FilterAlt } from '@mui/icons-material';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Grid, Typography } from '@mui/material';
import { TournamentDto } from '../dto/tournament/TournamentDto';
import { useContext, useEffect, useState } from 'react';
import { TournamentService } from '../services/tournamentService';
import TournamentBlock from '../components/tournament/list/TournamentBlock';
import TournamentFilters from '../components/tournament/list/TournamentFilters';
import { TourneyFilters } from '../domain/TourneyFilters';
import Hero from '../components/Hero';
import { AuthContext } from './Root';
import { AuthService } from '../services/authService';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [tourneys, setTourneys] = useState([] as TournamentDto[])
    const [filteredTourneys, setFilteredTourneys] = useState([] as TournamentDto[]);
    const [filters, setFilters] = useState({
        name: '',
        minKeys: '',
        maxKeys: '',
        minTeamSize: '',
        maxTeamSize: '',
        minPlayerRank: '',
        maxPlayerRank: ''
    } as TourneyFilters);
    const authService = new AuthService();

    useEffect(() => {
        new TournamentService()
            .getAll()
            .then(tourneys => {
                setTourneys(tourneys);
                setFilteredTourneys(tourneys);
            });
    }, []);

    const filterTournaments = () => {
        setFilteredTourneys(
            tourneys.filter(tourney => 
                tourney.name.toUpperCase().includes(filters.name.toUpperCase()) &&
                (!filters.minKeys || tourney.keys >= parseInt(filters.minKeys)) &&
                (!filters.maxKeys || tourney.keys <= parseInt(filters.maxKeys)) &&
                (!filters.minPlayerRank || tourney.minPlayerRank >= parseInt(filters.minPlayerRank)) &&
                (!filters.minPlayerRank || tourney.maxPlayerRank <= parseInt(filters.minPlayerRank)) &&
                (!filters.minTeamSize || tourney.minTeamSize >= parseInt(filters.minTeamSize)) &&
                (!filters.maxTeamSize || tourney.maxTeamSize <= parseInt(filters.maxTeamSize))
            )
        );
    }

    const canDisplayTourney = (tourney: TournamentDto, done: boolean) => {
        return tourney.done === done && ((user && authService.isStaff(user, tourney.id)) || tourney.public);
    }

    return (  
        <Grid container direction='column' rowGap={2}>
            <Hero isLoggedIn={user !== null}/>
            <Grid item>
                <Accordion elevation={2} defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMore/>} sx={{ paddingLeft: 5 }}>
                        <Typography variant='h3' fontSize={36}>
                            Filter tournaments
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ paddingLeft: 5 }}>
                        <TournamentFilters 
                            filters={filters} 
                            setFilters={setFilters}
                        />
                    </AccordionDetails>
                    <AccordionActions sx={{ justifyContent: 'start', padding: 2, paddingTop: 0, paddingLeft: 5 }}>
                        <Button variant='contained' startIcon={<FilterAlt/>} onClick={filterTournaments}>
                            Filter
                        </Button>
                        <Button variant='contained' onClick={() => setFilteredTourneys(tourneys)}>
                            Clear filters
                        </Button>
                    </AccordionActions>
                </Accordion>
            </Grid>
            <Grid item>
                <TournamentBlock 
                    name='Ongoing tournaments'
                    tourneys={filteredTourneys.filter(tourney => canDisplayTourney(tourney, false))}/>
            </Grid>
            <Grid item>
                <TournamentBlock 
                    name='Past tournaments'
                    tourneys={filteredTourneys.filter(tourney => canDisplayTourney(tourney, true))}/>
            </Grid>
        </Grid>

    );
}

export default Home;