import { Grid } from '@mui/material';
import NoItems from '../NoItems';
import TeamPlayerCard from './TeamPlayerCard';
import { UserDto } from '../../../dto/user/UserDto';
import { TeamDto } from '../../../dto/team/TeamDto';
import { Fragment } from 'react';

const TeamPlayerList = ({teams}: {teams: TeamDto[]}) => {

    const playerIsCaptain = (teamName: string, player: UserDto) => {
        return player.stats.find(stats => 
            stats.team === teamName && stats.teamCaptain
        ) !== undefined;
    }

    return (  
        <Grid container spacing={2} justifyContent='center'>
            {teams.length === 0 && <NoItems name='players'/>}
            {teams.map(team => 
                <Fragment key={team.id}>
                {team.players
                    .sort((a, b) => a.rank - b.rank)
                    .map(player => 
                    <Grid item key={player.id}>
                        <TeamPlayerCard player={player} isCaptain={playerIsCaptain(team.name, player)} isSeparate/>
                    </Grid>
                )}
                </Fragment>
            )}
        </Grid>
    );
}

export default TeamPlayerList;