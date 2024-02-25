import { Card, CardMedia, Grid, Typography, useTheme } from '@mui/material';
import { IUserDto } from '../../../dto/IUserDto';
import { StaffCardContent } from '../../styled/StaffCardContent';
import { PersonRemove } from '@mui/icons-material';
import ConfirmationDialog from '../dialog/ConfirmationDialog';
import Flag from '../../Flag';
import { AuthService } from '../../../services/authService';
import { useParams } from 'react-router-dom';

const StaffCard = ({user}: {user: IUserDto}) => {
    const { id } = useParams();
    const theme = useTheme();

    const isHost = new AuthService()
        .isHost(user, id!);

    return (  
        <Card elevation={8} sx={{ display: 'flex', width: 320, height: 80 }}>
            <CardMedia
                sx={{ width: 80, minWidth: 80 }}
                className='avatar'
                image={user.avatar} 
                title={`Avatar of ${user.name}`}
            />
            <StaffCardContent sx={{ flexGrow: 1 }}>
                <Grid container columnSpacing={1}>
                    <Grid item xs={isHost ? 12 : 9}>
                        <Typography fontSize={18}>
                            {user.name}
                        </Typography>
                    </Grid>
                    {!isHost && 
                    <Grid item xs={3}>
                        <ConfirmationDialog 
                            btnIcon={<PersonRemove/>}
                            btnProps={{ color: 'error' }}
                            title={'Are you sure you wish to remove this staff member?'} 
                            actionTitle={'Remove'} 
                            action={() => console.log('removing...')}
                        />
                    </Grid>}
                    <Flag country={user.country}/>
                    <Grid item>
                        <Typography lineHeight={1.7} fontSize={12} color={theme.palette.text.secondary}>
                            {user.country.name}
                        </Typography>
                    </Grid>
                </Grid>
            </StaffCardContent>
        </Card>
    );
}

export default StaffCard;