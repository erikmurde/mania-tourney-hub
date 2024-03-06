import { Grid } from '@mui/material';
import { TeamDto } from '../../../dto/team/TeamDto';
import TeamCard from './TeamCard';
import { TeamService } from '../../../services/teamService';

interface IProps {
    teams: TeamDto[],
    setTeams: (teams: TeamDto[]) => void
}

const TeamList = ({teams, setTeams}: IProps) => {

    const eliminateTeam = async(team: TeamDto) => {
        const activeTeams = teams
            .filter(team => team.status === 'active');

        team.status = 'eliminated';
        team.placement = activeTeams.length;

        await new TeamService().edit(team.id, team);
        setTeams(teams.map(existing => 
            existing.id === team.id ? team : existing
        ));
    }

    return (  
        <Grid container spacing={2} justifyContent='center'>
            {teams.map(team => 
                <Grid item key={team.id}>
                    <TeamCard team={team} eliminateTeam={eliminateTeam}/>
                </Grid>
            )}
        </Grid>
    );
}
 
export default TeamList;