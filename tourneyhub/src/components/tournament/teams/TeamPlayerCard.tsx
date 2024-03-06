import { Card, CardMedia, Grid, Typography, useTheme } from '@mui/material';
import { TeamPlayerDto } from '../../../dto/team/TeamPlayerDto';
import { UserCardContent } from '../../styled/UserCardContent';
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TeamPlayerCard = ({player}: {player: TeamPlayerDto}) => {
    const theme = useTheme();

    return (  
        <Card elevation={12} sx={{ display: 'flex', height: 70 }}>
            <CardMedia
                sx={{ width: 70, minWidth: 70 }}
                className='avatar'
                image={player.avatar} 
                title={`Avatar of ${player.name}`}
            />
            <UserCardContent>
                <Grid container columnSpacing={1} alignItems='center'>
                    <Grid item xs={player.isCaptain ? 10 : 12}>
                        <Typography>
                            {player.name} #{player.rank}
                        </Typography>
                    </Grid>
                    {player.isCaptain && 
                    <Grid item xs textAlign='end'>
                        <FontAwesomeIcon 
                            icon={faCrown} 
                            color={theme.palette.warning.main} 
                            size='lg'/>
                    </Grid>}
                </Grid>
            </UserCardContent>
        </Card>
    );
}

export default TeamPlayerCard;