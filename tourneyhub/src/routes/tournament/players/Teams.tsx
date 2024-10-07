import { Paper, Grid, Tabs, Tab } from '@mui/material';
import TeamList from '../../../components/tournament/teams/TeamList';
import SectionTitle from '../../../components/tournament/SectionTitle';
import { TeamDto } from '../../../dto/team/TeamDto';
import { useContext, useEffect, useState } from 'react';
import { TeamService } from '../../../services/teamService';
import { Publish } from '@mui/icons-material';
import { AuthContext, ErrorContext } from '../../Root';
import { TournamentService } from '../../../services/tournamentService';
import { ACTIVE, ADMIN, DISQUALIFIED, HOST } from '../../../constants';
import ConfirmationDialog from '../../../components/tournament/dialog/ConfirmationDialog';
import TeamPlayerList from '../../../components/tournament/teams/TeamPlayerList';
import { useTourney } from '../TournamentHeader';
import NoItems from '../../../components/tournament/NoItems';

const Teams = () => {
    const { setError } = useContext(ErrorContext);
    const { user } = useContext(AuthContext);
    const { tourney } = useTourney();

    const [teams, setTeams] = useState([] as TeamDto[]);
    const [showTeams, setShowTeams] = useState(1);
    const [loading, setLoading] = useState(true);

    const validRoles = [HOST, ADMIN];
    const tourneyService = new TournamentService();
    const teamService = new TeamService();

    const hasValidRoles = user && user.roles
        .filter(tourneyRole => tourneyRole.tournamentId === tourney.id)
        .some(tourneyRole => validRoles.includes(tourneyRole.role));

    useEffect(() => {
        teamService
            .getTeams(tourney.id)
            .then(teams => setTeams((hasValidRoles 
                ? teams 
                : teams.filter(team => team.status !== DISQUALIFIED))
                .sort((a, b) => tourneyService.compareSeeds(a.seed, b.seed) || (a.name > b.name ? 1 : -1))
            ))
            .finally(() => setLoading(false));
    }, [tourney.id, hasValidRoles]);

    const publishTeams = async() => {
        const error = await tourneyService.publishPlayers(tourney.id);

        if (error) {
            return setError(error);
        }
        updateState();
    }

    const updateState = () => {
        const newTeams = [...teams];
        tourney.playersPublished = true;

        for (const team of newTeams) {
            if (team.status !== DISQUALIFIED) {
                team.status = ACTIVE;
            }
        }
        setTeams(newTeams);
    }

    return (  
        <Paper elevation={2} sx={{ minHeight: 800, paddingBottom: 2 }}>
            <Grid container marginBottom={5}>
                <SectionTitle title='Teams' xsAuto/>
                <Grid item xs margin='auto' container justifyContent='center'>
                    <Tabs
                        textColor='secondary'
                        indicatorColor='secondary'
                        value={showTeams} 
                        onChange={(_, value) => setShowTeams(value)}
                        >
                        <Tab label='Teams' value={1}/>
                        <Tab label='Players' value={0}/>
                    </Tabs>
                </Grid>
                {hasValidRoles && !tourney.playersPublished &&
                <Grid item xs={12} margin={5} marginTop={2}>
                    <ConfirmationDialog
                        btnProps={{ 
                            title: 'Publish', 
                            startIcon: <Publish/>, 
                            sx: { width: 150, marginRight: 1 }
                        }}
                        title={'Are you sure you wish to publish the teams list?'} 
                        actionTitle={'Publish'} 
                        action={() => publishTeams()}/>
                </Grid>}
                {(hasValidRoles || tourney.playersPublished) &&
                <Grid item xs={12}>
                    <NoItems name={showTeams ? 'teams' : 'players'} loading={loading} display={teams.length === 0}/>
                    {showTeams 
                    ?   <TeamList 
                            teamsPublic={tourney.playersPublished} 
                            teams={teams} 
                            setTeams={setTeams}/>
                    :   <TeamPlayerList teams={teams}/>}
                </Grid>}
            </Grid>
        </Paper>
    );
}

export default Teams;