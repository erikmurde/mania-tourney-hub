import { Card, Grid, Typography, useTheme } from '@mui/material';
import { TeamDto } from '../../../dto/team/TeamDto';
import { StyledCardContent } from '../../styled/StyledCardContent';
import { GroupRemove } from '@mui/icons-material';
import { useContext } from 'react';
import { AuthContext } from '../../../routes/Root';
import TeamPlayerCard from './TeamPlayerCard';
import { ACTIVE, ADMIN, ELIMINATED, HOST, REGISTERED, SUFFIX_MAP } from '../../../constants';
import ConfirmationDialog from '../dialog/ConfirmationDialog';
import { useTourney } from '../../../routes/tournament/TournamentHeader';
import { UserDto } from '../../../dto/user/UserDto';

interface IProps {
    teamsPublic: boolean,
    team: TeamDto,
    eliminateTeam: (team: TeamDto) => Promise<void>
}

const TeamCard = ({teamsPublic, team, eliminateTeam}: IProps) => {
    const { tourney } = useTourney();
    const { user } = useContext(AuthContext);
    const validRoles = [HOST, ADMIN];
    const theme = useTheme();

    const playerIsCaptain = (player: UserDto) => {
        return player.stats.find(stats => 
            stats.team === team.name && stats.teamCaptain
        ) !== undefined;
    }

    const colorMap = new Map<string, string>([
        [ACTIVE, theme.palette.success.main],
        [ELIMINATED, theme.palette.error.main],
        [REGISTERED, theme.palette.primary.main]
    ])

    const isValid = user && user.roles
        .filter(tourneyRole => tourneyRole.tournamentId === tourney.id)
        .some(tourneyRole => validRoles.includes(tourneyRole.role));

    const eliminated = team.status === ELIMINATED;

    return (  
        <Card elevation={6} sx={{ width: 400 }}>
            <StyledCardContent>
                <Grid container alignItems='center' marginBottom={isValid ? 1 : 2}>
                    <Grid item width={60} height={40} xs='auto' marginRight={1}>
                        <img 
                            className='flag' 
                            src={team.logo} 
                            alt={`Logo of ${team.name}`}/>
                    </Grid>
                    <Grid item xs>
                        <Typography fontSize={18} fontWeight={500}>
                            {team.name}
                        </Typography>
                    </Grid>
                    <Grid item xs='auto'>
                        <Typography>
                            {team.seed > 0 ? `Seed ${team.seed}` : ''}
                        </Typography>
                    </Grid>
                    {isValid &&
                    <>
                    <Grid item xs={9} marginTop={0.5}>
                        <Typography color={colorMap.get(team.status)} fontWeight={700}>
                            {team.status.toUpperCase()}
                        </Typography>
                    </Grid>
                    {!eliminated &&
                    <Grid item xs={3} textAlign='end'>
                        <ConfirmationDialog 
                            btnIcon={<GroupRemove/>}
                            btnProps={{ color: 'error' }}
                            title={`Are you sure you wish to ${teamsPublic ? 'eliminate' : 'remove'} this team?`}
                            actionTitle={teamsPublic ? 'Eliminate' : 'Remove'} 
                            tooltip={teamsPublic ? 'Eliminate' : 'Remove'}
                            action={() => eliminateTeam(team)}/>
                    </Grid>}
                    {eliminated &&
                    <Grid item xs textAlign='end'>
                        <Typography color='secondary'>
                            {team.placement}{SUFFIX_MAP.get(team.placement % 10) ?? 'th'} place
                        </Typography>
                    </Grid>}
                    </>}
                </Grid>
                <Grid container direction='column' rowSpacing={1}>
                    {team.players
                        .sort((a, b) => a.rank - b.rank)
                        .map(player => 
                        <Grid item key={player.id}>
                            <TeamPlayerCard player={player} isCaptain={playerIsCaptain(player)}/>
                        </Grid>    
                    )}
                </Grid>
            </StyledCardContent>
        </Card>
    );
}

export default TeamCard;