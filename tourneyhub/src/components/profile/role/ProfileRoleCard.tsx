import { Card, Divider, Grid, Typography, useTheme } from '@mui/material';
import { StyledCardContent } from '../../styled/StyledCardContent';
import { TournamentDto } from '../../../dto/tournament/TournamentDto';
import { TournamentService } from '../../../services/tournamentService';
import { useEffect, useState } from 'react';
import { GFX, PLAYER } from '../../../constants';
import { TeamDto } from '../../../dto/team/TeamDto';
import { TeamService } from '../../../services/teamService';
import PlayerRoles from './PlayerRoles';
import StaffRoles from './StaffRoles';
import { TournamentRoleDto } from '../../../dto/tournamentRole/TournamentRoleDto';
import { TournamentStatsDto } from '../../../dto/TournamentStatsDto';

interface IProps {
    tournamentId: string,
    userId: string,
    roles: TournamentRoleDto[],
    stats: TournamentStatsDto
}

const ProfileRoleCard = ({tournamentId, userId, roles, stats}: IProps) => {
    const theme = useTheme();
    const [tourney, setTourney] = useState({} as TournamentDto);
    const [userTeam, setUserTeam] = useState(null as TeamDto | null);

    useEffect(() => {
        new TournamentService()
            .getEntity(tournamentId)
            .then(tourney => setTourney(tourney));
        new TeamService()
            .getUserTeam(userId, tournamentId)
            .then(team => setUserTeam(team));
    }, []);

    const staffRoles = roles
        .filter(role => role.name !== PLAYER)
        .map(role => 
            role.name === GFX ? 'Graphics designer' : role.name[0].toUpperCase() + role.name.slice(1)
        );
    
    return (  
        <Card elevation={12}>
            <StyledCardContent>
                <Grid container>
                    <Grid item flexGrow={1}>
                        <Typography fontWeight={500}>
                            {tourney.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography 
                            fontWeight={700} 
                            color={tourney.done ? theme.palette.error.main : theme.palette.success.main}
                            >
                            {tourney.done ? 'ENDED' : 'ONGOING'}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ marginTop: 1, marginBottom: 1 }}/>
                <StaffRoles 
                    tourneyDone={tourney.done} 
                    staffRoles={staffRoles}/>
                <PlayerRoles 
                    tourneyDone={tourney.done} 
                    teamName={userTeam?.name}
                    seeding={userTeam ? userTeam.seed : stats.seed} 
                    placement={userTeam ? userTeam.placement : stats.placement}/>
            </StyledCardContent>
        </Card>
    );
}

export default ProfileRoleCard;