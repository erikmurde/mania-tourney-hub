import { Card, CardMedia, Grid, Typography, useTheme } from '@mui/material';
import { IUserDto } from '../../../dto/IUserDto';
import Flag from '../../Flag';
import { PersonRemove } from '@mui/icons-material';
import ConfirmationDialog from '../dialog/ConfirmationDialog';
import { UserCardContent } from '../../styled/UserCardContent';
import { AuthService } from '../../../services/authService';
import { useContext } from 'react';
import { AuthContext } from '../../../routes/Root';
import { useParams } from 'react-router-dom';

const PlayerCard = ({player}: {player: IUserDto}) => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const theme = useTheme();
    const stats = player.stats[0];

    const isHost = user && id && new AuthService().isHost(user, id);

    const colorMap = new Map<string, string>([
        ['active', theme.palette.success.main],
        ['eliminated', theme.palette.error.main],
        ['registered', theme.palette.primary.main]
    ])

    const suffixMap = new Map<number, string>([
        [1, 'st'], [2, 'nd'], [3, 'rd']
    ])

    return (  
        <Card elevation={8} sx={{ display: 'flex', width: 400, height: 90 }}>
            <CardMedia
                sx={{ width: 90, minWidth: 90 }}
                className='avatar'
                image={player.avatar} 
                title={`Avatar of ${player.name}`}
            />
            <UserCardContent>
                <Grid container columnSpacing={1} alignItems='center'>
                    <Grid item xs={8} marginBottom={0.2}>
                        <Typography>
                            {player.name} #{player.rank}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography fontSize={14} textAlign='end'>
                            Seed {stats.seeding}
                        </Typography>
                    </Grid>
                    <Flag country={player.country}/>
                    <Grid item xs={8}>
                        <Typography lineHeight={1.7} fontSize={12} color={theme.palette.text.secondary}>
                            {player.country.name}
                        </Typography>
                    </Grid>
                    {isHost && 
                    <Grid item xs={6} height={30}>
                        <Typography color={colorMap.get(stats.status)} fontSize={14} marginTop={1} fontWeight={700}>
                            {stats.status.toUpperCase()}
                        </Typography>
                    </Grid>}
                    <Grid item xs={isHost ? 6 : 12} textAlign={'end'} height={30}>
                        {stats.placement > 0 &&
                        <Typography fontSize={14} marginTop={1}>
                            {stats.placement}{suffixMap.get(stats.placement % 10) ?? 'th'} place
                        </Typography>}
                        {stats.placement === 0 && isHost &&
                        <ConfirmationDialog 
                            btnIcon={<PersonRemove/>}
                            btnProps={{ color: 'error', sx: { padding: 0.5, marginTop: 0.3 }}}
                            title={'Are you sure you wish to eliminate this player?'} 
                            actionTitle={'Eliminate'} 
                            action={() => console.log('eliminating...')}
                        />}
                    </Grid>
                </Grid>
            </UserCardContent>
        </Card>
    );
}

export default PlayerCard;