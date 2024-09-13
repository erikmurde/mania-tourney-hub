import { Card, CardActionArea, CardMedia, Grid, Typography, useTheme } from '@mui/material';
import { IUserDto } from '../../../dto/user/IUserDto';
import { PersonRemove } from '@mui/icons-material';
import ConfirmationDialog from '../dialog/ConfirmationDialog';
import Flag from '../../Flag';
import { AuthService } from '../../../services/authService';
import { useParams } from 'react-router-dom';
import { UserCardContent } from '../../styled/UserCardContent';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../routes/Root';
import Profile from '../../../routes/profile/Profile';

interface IProps {
    staff: IUserDto,
    removeStaff: (staff: IUserDto) => void
}

const StaffCard = ({staff, removeStaff}: IProps) => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const service = new AuthService();

    const isHost = user && id && service.isHost(user, id);
    const isStaffHost = id && service.isHost(staff, id);

    return (  
        <Card elevation={8} sx={{ display: 'flex', width: 320, height: 80 }}>
            <CardActionArea sx={{ width: 80, minWidth: 80, height: 1 }} onClick={() => setOpen(true)}>
                <CardMedia
                    className='avatar'
                    image={staff.avatar} 
                    title={`Avatar of ${staff.name}`}
                />
            </CardActionArea>
            <Profile owner={staff} open={open} setOpen={setOpen}/>
            <UserCardContent>
                <Grid container columnSpacing={1}>
                    <Grid item xs={isStaffHost || !isHost ? 12 : 9}>
                        <Typography fontSize={18}>
                            {staff.name}
                        </Typography>
                    </Grid>
                    {!isStaffHost && isHost &&
                    <Grid item xs={3} textAlign='end'>
                        <ConfirmationDialog 
                            btnIcon={<PersonRemove/>}
                            btnProps={{ color: 'error', sx: { padding: 0.5 }}}
                            title={'Are you sure you wish to remove this staff member?'} 
                            actionTitle={'Remove'} 
                            action={() => removeStaff(staff)}
                        />
                    </Grid>}
                    <Flag country={staff.country} props={{ marginTop: 0.5 }}/>
                    <Grid item marginTop={0.5}>
                        <Typography lineHeight={1.7} fontSize={12} color={theme.palette.text.secondary}>
                            {staff.country.name}
                        </Typography>
                    </Grid>
                </Grid>
            </UserCardContent>
        </Card>
    );
}

export default StaffCard;