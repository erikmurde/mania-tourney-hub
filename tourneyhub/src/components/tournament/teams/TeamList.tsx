import { Grid } from '@mui/material';
import { TeamDto } from '../../../dto/team/TeamDto';
import TeamCard from './TeamCard';
import { TeamService } from '../../../services/teamService';
import NoItems from '../NoItems';

interface IProps {
    teamsPublic: boolean,
    teams: TeamDto[],
    setTeams: (teams: TeamDto[]) => void
}

const TeamList = ({teamsPublic, teams, setTeams}: IProps) => {

    const eliminateTeam = async(team: TeamDto) => {
        const activeTeams = teams
            .filter(team => team.status === 'active');

        team.status = teamsPublic ? 'eliminated' : 'disqualified';
        team.placement = teamsPublic ? activeTeams.length : 0;

        await new TeamService().edit(team.id, team);
        setTeams(teams.map(existing => 
            existing.id === team.id ? team : existing
        ));
    }

    return (  
        <Grid container spacing={2} justifyContent='center'>
            {teams.length === 0 && <NoItems name='teams'/>}
            {teams.map(team => 
                <Grid item key={team.id}>
                    <TeamCard teamsPublic={teamsPublic} team={team} eliminateTeam={eliminateTeam}/>
                </Grid>
            )}
        </Grid>
    );
}
 
export default TeamList;