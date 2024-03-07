import { Paper, Grid, Button } from '@mui/material';
import TeamList from '../../../components/tournament/teams/TeamList';
import SectionTitle from '../../../components/tournament/SectionTitle';
import { TeamDto } from '../../../dto/team/TeamDto';
import { useContext, useEffect, useState } from 'react';
import { TeamService } from '../../../services/teamService';
import { useParams } from 'react-router-dom';
import { GroupAdd, Publish } from '@mui/icons-material';
import { AuthContext } from '../../Root';
import { TournamentDto } from '../../../dto/tournament/TournamentDto';
import { TournamentService } from '../../../services/tournamentService';
import { ACTIVE, ADMIN, DISQUALIFIED, HOST } from '../../../constants';
import ConfirmationDialog from '../../../components/tournament/dialog/ConfirmationDialog';

const Teams = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [teams, setTeams] = useState([] as TeamDto[]);
    const [tourney, setTourney] = useState({} as TournamentDto);
    const validRoles = [HOST, ADMIN];
    const tourneyService = new TournamentService();
    const teamService = new TeamService();

    const isValid = user && user.roles
        .filter(role => role.tournamentId === id)
        .some(role => validRoles.includes(role.name));

    useEffect(() => {
        if (id) {
            tourneyService
                .getEntity(id)
                .then(tourney => setTourney(tourney));

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
                <SectionTitle title='Teams'/>
                {isValid && 
                <Grid item xs={12} margin={5} marginTop={2}>
                    {!tourney.participantsPublic && 
                    <ConfirmationDialog
                        btnProps={{ 
                            title: 'Publish', 
                            startIcon: <Publish/>, 
                            sx: { width: 150, marginRight: 1 }
                        }}
                        title={'Are you sure you wish to publish the teams list?'} 
                        actionTitle={'Publish'} 
                        action={() => publishTeams()}/>}
                    <Button 
                        variant='contained' 
                        startIcon={<GroupAdd/>} 
                        sx={{ width: 150 }}
                        >
                        Add team
                    </Button>
                </Grid>}
                {(isValid || tourney.participantsPublic) &&
                <Grid item>
                    <TeamList 
                        teamsPublic={tourney.participantsPublic} 
                        teams={teams} 
                        setTeams={setTeams}
                    />
                </Grid>}
            </Grid>
        </Paper>
    );
}

export default Teams;