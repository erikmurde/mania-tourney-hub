import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { StaffApplicationDto } from '../../../dto/staffApplication/StaffApplicationDto';
import { useEffect, useState } from 'react';
import { AuthService } from '../../../services/authService';
import { IUserDto } from '../../../dto/IUserDto';
import Flag from '../../Flag';
import { StyledCardActions } from '../../styled/StyledCardActions';
import ConfirmationDialog from '../dialog/ConfirmationDialog';

interface IProps {
    application: StaffApplicationDto,
    updateStatus: (application: StaffApplicationDto, status: string) => void
}

const StaffApplicationCard = ({application, updateStatus}: IProps) => {
    const [user, setUser] = useState({} as IUserDto);

    useEffect(() => {
        new AuthService()
            .getUser(application.userId)
            .then(user => setUser(user));
    }, []);

    return (  
        <Card elevation={8} sx={{ width: 600 }}>
            <CardContent>
                <Grid container columnSpacing={1} marginBottom={1}>
                    <Flag country={user.country}/>
                    <Grid item xs>
                        <Typography fontWeight={700}>
                        {user.name} - {application.role} role
                        </Typography>
                    </Grid>
                </Grid>
                <Divider/>
                <Typography fontSize={14} fontWeight={700} marginTop={1} marginBottom={0.5}>
                    Past experience
                </Typography>
                <Typography fontSize={14}>
                    {application.experience}
                </Typography>
                <Typography fontSize={14} fontWeight={700} marginTop={1} marginBottom={0.5}>
                    Motivation
                </Typography>
                <Typography fontSize={14}>
                    {application.motivation}
                </Typography>
            </CardContent>
            <StyledCardActions>
                <ConfirmationDialog 
                    btnProps={{ color: 'success', title: 'Accept', sx: { height: 30 }}}
                    title={'Are you sure you wish to accept this application?'} 
                    actionTitle={'Accept'} 
                    action={() => updateStatus(application, 'accepted')}/>
                <ConfirmationDialog 
                    btnProps={{ color: 'error', title: 'Reject', sx: { height: 30 }}}
                    title={'Are you sure you wish to reject this application?'} 
                    actionTitle={'Reject'} 
                    action={() => updateStatus(application, 'rejected')}/>
            </StyledCardActions>
        </Card>
    );
}
 
export default StaffApplicationCard;