import { Card, Grid, Typography, useTheme } from '@mui/material';
import { TeamDto } from '../../../dto/team/TeamDto';
import { StyledCardContent } from '../../styled/StyledCardContent';
import { Edit, GroupRemove } from '@mui/icons-material';
import { StyledIconButton } from '../../styled/StyledIconButton';
import { useContext } from 'react';
import { AuthContext } from '../../../routes/Root';
import { AuthService } from '../../../services/authService';
import { useParams } from 'react-router-dom';
import TeamPlayerCard from './TeamPlayerCard';
import { SUFFIX_MAP } from '../../../constants';
import ConfirmationDialog from '../dialog/ConfirmationDialog';

interface IProps {
    team: TeamDto,
    eliminateTeam: (team: TeamDto) => void
}

const TeamCard = ({team, eliminateTeam}: IProps) => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const theme = useTheme();

    const colorMap = new Map<string, string>([
        ['active', theme.palette.success.main],
        ['eliminated', theme.palette.error.main],
        ['registered', theme.palette.primary.main]
    ])

    const isHost = id && user && new AuthService().isHost(user, id);
    const eliminated = team.status === 'eliminated';

    return (  
        <Card elevation={6} sx={{ width: 400 }}>
            <StyledCardContent>
                <Grid container alignItems='center' marginBottom={isHost ? 1 : 2}>
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
                            Seed {team.seeding}
                        </Typography>
                    </Grid>
                    {isHost &&
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
                            title='Are you sure you wish to eliminate this team?' 
                            actionTitle='Eliminate' 
                            action={() => eliminateTeam(team)}
                            />
                        <StyledIconButton color='primary'>
                            <Edit/>
                        </StyledIconButton>
                    </Grid>}
                    {eliminated &&
                    <Grid item xs textAlign='end'>
                        <Typography>
                            {team.placement}{SUFFIX_MAP.get(team.placement % 10) ?? 'th'} place
                        </Typography>
                    </Grid>}
                    </>}
                </Grid>
                <Grid container direction='column' rowSpacing={1}>
                    {team.players.map(player => 
                        <Grid item key={player.id}>
                            <TeamPlayerCard player={player}/>
                        </Grid>    
                    )}
                </Grid>
            </StyledCardContent>
        </Card>
    );
}

export default TeamCard;