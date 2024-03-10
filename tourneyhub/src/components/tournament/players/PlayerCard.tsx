import { Card, CardMedia, Grid, Typography, useTheme } from '@mui/material';
import { IUserDto } from '../../../dto/user/IUserDto';
import Flag from '../../Flag';
import { PersonRemove } from '@mui/icons-material';
import ConfirmationDialog from '../dialog/ConfirmationDialog';
import { UserCardContent } from '../../styled/UserCardContent';
import { AuthService } from '../../../services/authService';
import { useContext } from 'react';
import { AuthContext } from '../../../routes/Root';
import { useParams } from 'react-router-dom';
import { ACTIVE, DISQUALIFIED, ELIMINATED, REGISTERED, SUFFIX_MAP } from '../../../constants';

interface IProps {
    playersPublic: boolean,
    player: IUserDto,
    eliminatePlayer: (player: IUserDto) => void
}

const PlayerCard = ({playersPublic, player, eliminatePlayer}: IProps) => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const theme = useTheme();
    const stats = player.stats[0];

    const isHost = user && id && new AuthService().isHost(user, id);
    const disqualified = player.stats[0].status === DISQUALIFIED;

    const colorMap = new Map<string, string>([
        [ACTIVE, theme.palette.success.main],
        [ELIMINATED, theme.palette.error.main],
        [DISQUALIFIED, theme.palette.error.main],
        [REGISTERED, theme.palette.primary.main]
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
                    <Grid item xs={playersPublic ? 9 : 12}>
                        <Typography>
                            {player.name} #{player.rank}
                        </Typography>
                    </Grid>
                    {playersPublic && 
                    <Grid item xs={3}>
                        <Typography fontSize={14} textAlign='end'>
                            Seed {stats.seeding}
                        </Typography>
                    </Grid>}
                    <Flag country={player.country}/>
                    <Grid item xs={10} marginTop={0.5}>
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
                            {stats.placement}{SUFFIX_MAP.get(stats.placement % 10) ?? 'th'} place
                        </Typography>}
                        {stats.placement === 0 && isHost && !disqualified &&
                        <ConfirmationDialog 
                            btnIcon={<PersonRemove/>}
                            btnProps={{ color: 'error', sx: { padding: 0.5, marginTop: 0.3 }}}
                            title={`Are you sure you wish to ${playersPublic ? 'eliminate' : 'disqualify'} this player?`} 
                            actionTitle={playersPublic ? 'Eliminate' : 'Disqualify'} 
                            action={() => eliminatePlayer(player)}
                        />}
                    </Grid>
                </Grid>
            </UserCardContent>
        </Card>
    );
}

export default PlayerCard;