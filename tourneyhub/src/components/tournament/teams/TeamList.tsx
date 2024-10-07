import { Grid } from '@mui/material';
import { TeamDto } from '../../../dto/team/TeamDto';
import TeamCard from './TeamCard';
import { TournamentService } from '../../../services/tournamentService';
import { useTourney } from '../../../routes/tournament/TournamentHeader';
import { useContext } from 'react';
import { AuthContext, ErrorContext } from '../../../routes/Root';
import { ACTIVE, ELIMINATED } from '../../../constants';

interface IProps {
    teamsPublic: boolean,
    teams: TeamDto[],
    setTeams: (teams: TeamDto[]) => void
}

const TeamList = ({teamsPublic, teams, setTeams}: IProps) => {
    const { updateUser } = useContext(AuthContext);
    const { setError } = useContext(ErrorContext);
    const { tourney } = useTourney();

    const eliminateTeam = async(team: TeamDto) => {
        const error = await new TournamentService().eliminatePlayer(tourney.id, team.id, true);

        if (error) {
            return setError(error);
        }
        updateState(team);
    }

    const updateState = (team: TeamDto) => {
        if (!teamsPublic) {
            updateUser();
            return setTeams(teams.filter(existing => existing.id !== team.id));
        }
        const activeTeams = teams.filter(team => team.status === ACTIVE);

        team.status = ELIMINATED;
        team.placement = activeTeams.length;

        setTeams(teams.map(existing => 
            existing.id === team.id ? team : existing
        ));
    }

    return (  
        <Grid container spacing={2} justifyContent='center'>
            {teams.map(team => 
                <Grid item key={team.id}>
                    <TeamCard teamsPublic={teamsPublic} team={team} eliminateTeam={eliminateTeam}/>
                </Grid>
            )}
        </Grid>
    );
}
 
export default TeamList;