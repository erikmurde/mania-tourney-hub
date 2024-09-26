import { Paper, Grid, Tabs, Tab } from '@mui/material';
import TeamList from '../../../components/tournament/teams/TeamList';
import SectionTitle from '../../../components/tournament/SectionTitle';
import { TeamDto } from '../../../dto/team/TeamDto';
import { useContext, useEffect, useState } from 'react';
import { TeamService } from '../../../services/teamService';
import { Publish } from '@mui/icons-material';
import { AuthContext } from '../../Root';
import { TournamentService } from '../../../services/tournamentService';
import { ACTIVE, ADMIN, DISQUALIFIED, HOST } from '../../../constants';
import ConfirmationDialog from '../../../components/tournament/dialog/ConfirmationDialog';
import TeamPlayerList from '../../../components/tournament/teams/TeamPlayerList';
import { useTourney } from '../TournamentHeader';

const Teams = () => {
    const { tourney } = useTourney();
    const { user } = useContext(AuthContext);

    const [teams, setTeams] = useState([] as TeamDto[]);
    const [showTeams, setShowTeams] = useState(1);

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
                .sort((a, b) => a.seed - b.seed)
            ));
    }, [tourney.id, hasValidRoles]);

    const publishTeams = async() => {
        const newTeams = [...teams];
        tourney.playersPublished = true;

        for (const team of newTeams) {
            if (team.status !== DISQUALIFIED) {
                team.status = ACTIVE;
                await teamService.edit(team.id, team);
            }
        }
        await tourneyService.edit(tourney.id, tourney);
        setTeams(newTeams);
    }

    return (  
        <Paper elevation={2} sx={{ minHeight: 500, paddingBottom: 2 }}>
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