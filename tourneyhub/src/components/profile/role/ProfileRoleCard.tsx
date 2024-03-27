import { Card, Divider, Grid, Typography, useTheme } from '@mui/material';
import { IRoleDto } from '../../../dto/IRoleDto';
import { StyledCardContent } from '../../styled/StyledCardContent';
import { TournamentDto } from '../../../dto/tournament/TournamentDto';
import { TournamentService } from '../../../services/tournamentService';
import { useEffect, useState } from 'react';
import { GFX, PLAYER, SUFFIX_MAP } from '../../../constants';
import { IStatDto } from '../../../dto/IStatDto';

interface IProps {
    tournamentId: string,
    roles: IRoleDto[],
    stats: IStatDto
}

const ProfileRoleCard = ({tournamentId, roles, stats}: IProps) => {
    const theme = useTheme();
    const [tourney, setTourney] = useState({} as TournamentDto);

    useEffect(() => {
        new TournamentService()
            .getEntity(tournamentId)
            .then(tourney => setTourney(tourney));
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
                <Typography fontWeight={700} color={theme.palette.secondary.main} marginBottom={0.5}>
                    Staff
                </Typography>
                <Typography marginBottom={1}>
                    {staffRoles.length > 0 
                        ? `${tourney.done ? 'Staffed' : 'Staffing'} as ${staffRoles.join(', ')}` 
                        : 'Did not staff in tournament'}.
                </Typography>
                <Typography fontWeight={700} color={theme.palette.primary.main} marginBottom={0.5}>
                    Player
                </Typography>
                {stats.seeding !== undefined && 
                <Typography>
                    {stats.seeding > 0 ? `Seeded ${stats.seeding}${SUFFIX_MAP.get(stats.seeding) ?? 'th'}` : 'Seeding TBD'}.
                    Final placement {stats.placement > 0 ? stats.placement : 'TBD'}.
                </Typography>}
                {stats.seeding === undefined && 
                <Typography>
                    {tourney.done ? 'Did not play' : 'Not playing'} in tournament.
                </Typography>}
            </StyledCardContent>
        </Card>
    );
}

export default ProfileRoleCard;