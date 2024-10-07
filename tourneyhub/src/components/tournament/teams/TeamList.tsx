import { Grid } from '@mui/material';
import { TeamDto } from '../../../dto/team/TeamDto';
import TeamCard from './TeamCard';
import { TournamentService } from '../../../services/tournamentService';
import { useTourney } from '../../../routes/tournament/TournamentHeader';
import { useContext } from 'react';
import { ErrorContext } from '../../../routes/Root';

interface IProps {
    teamsPublic: boolean,
    teams: TeamDto[],
    setTeams: (teams: TeamDto[]) => void
}

const TeamList = ({teamsPublic, teams, setTeams}: IProps) => {
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
        const activeTeams = teams
            .filter(team => team.status === 'active');

        team.status = teamsPublic ? 'eliminated' : 'disqualified';
        team.placement = teamsPublic ? activeTeams.length : 0;

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