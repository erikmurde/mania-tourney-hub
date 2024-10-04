import { Grid } from '@mui/material';
import TeamPlayerCard from './TeamPlayerCard';
import { UserDto } from '../../../dto/user/UserDto';
import { TeamDto } from '../../../dto/team/TeamDto';

const TeamPlayerList = ({teams}: {teams: TeamDto[]}) => {

    const playerIsCaptain = (teamName: string, player: UserDto) => {
        return player.stats.find(stats => 
            stats.team === teamName && stats.teamCaptain
        ) !== undefined;
    }

    const data = teams
        .map(team => 
            team.players.map(player => 
                ({ player: player, isCaptain: playerIsCaptain(team.name, player) })
            )
        )
        .flat();

    return (  
        <Grid container spacing={2} justifyContent='center'>
            {data
            .sort((a, b) => a.player.rank - b.player.rank)
            .map(({player, isCaptain}) => 
                <Grid item key={player.id}>
                    <TeamPlayerCard player={player} isCaptain={isCaptain} isSeparate/>
                </Grid>
            )}
        </Grid>
    );
}

export default TeamPlayerList;