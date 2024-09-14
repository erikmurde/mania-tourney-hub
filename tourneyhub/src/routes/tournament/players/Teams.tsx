import { Paper, Grid, Button, Tabs, Tab } from '@mui/material';
import TeamList from '../../../components/tournament/teams/TeamList';
import SectionTitle from '../../../components/tournament/SectionTitle';
import { TeamDto } from '../../../dto/team/TeamDto';
import { useContext, useEffect, useState } from 'react';
import { TeamService } from '../../../services/teamService';
import { useParams } from 'react-router-dom';
import { GroupAdd, Publish } from '@mui/icons-material';
import { AuthContext } from '../../Root';
import { TournamentService } from '../../../services/tournamentService';
import { ACTIVE, ADMIN, DISQUALIFIED, HOST } from '../../../constants';
import ConfirmationDialog from '../../../components/tournament/dialog/ConfirmationDialog';
import TeamPlayerList from '../../../components/tournament/teams/TeamPlayerList';
import { useTourney } from '../TournamentHeader';

const Teams = () => {
    const { id } = useParams();
    const { tourney } = useTourney();
    const { user } = useContext(AuthContext);
    const [teams, setTeams] = useState([] as TeamDto[]);
    const [showTeams, setShowTeams] = useState(1);
    const validRoles = [HOST, ADMIN];
    const tourneyService = new TournamentService();
    const teamService = new TeamService();

    const isValid = user && user.roles
        .filter(role => role.tournamentId === id)
        .some(role => validRoles.includes(role.name));

    useEffect(() => {
        if (id) {
            teamService
                .getTeams(id)
                .then(teams => setTeams(isValid 
                    ? teams 
                    : teams.filter(team => team.status !== DISQUALIFIED))
                );
        }
    }, [id, isValid]);

    const publishTeams = async() => {
        if (!id) {
            return;
        }
        const newTeams = [...teams];
        tourney.participantsPublic = true;

        for (const team of newTeams) {
            if (team.status !== DISQUALIFIED) {
                team.status = ACTIVE;
                await teamService.edit(team.id, team);
            }
        }
        await tourneyService.edit(id, tourney);
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
                {isValid && !tourney.participantsPublic &&
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
                {(isValid || tourney.participantsPublic) &&
                <Grid item xs={12}>
                    {showTeams 
                    ?   <TeamList 
                            teamsPublic={tourney.participantsPublic} 
                            teams={teams} 
                            setTeams={setTeams}/>
                    :   <TeamPlayerList players={
                            teams
                            .map(team => team.players)
                            .flat()
                            .sort((a, b) => a.rank - b.rank)
                        }/>}
                </Grid>}
            </Grid>
        </Paper>
    );
}

export default Teams;