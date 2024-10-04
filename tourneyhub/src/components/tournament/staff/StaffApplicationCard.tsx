import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { StaffApplicationDto } from '../../../dto/staff/application/StaffApplicationDto';
import Flag from '../../Flag';
import { StyledCardActions } from '../../styled/StyledCardActions';
import ConfirmationDialog from '../dialog/ConfirmationDialog';
import { ACCEPTED, GFX, REJECTED } from '../../../constants';

interface IProps {
    application: StaffApplicationDto,
    updateStatus: (application: StaffApplicationDto, status: string) => Promise<void>
}

const StaffApplicationCard = ({application, updateStatus}: IProps) => {

    const role = application.role === GFX 
        ? 'Graphics designer' 
        : application.role[0].toUpperCase() + application.role.slice(1);

    return (  
        <Card elevation={8} sx={{ width: 600 }}>
            <CardContent>
                <Grid container columnSpacing={1} marginBottom={1}>
                    <Flag country={application.sender.country} props={{ marginTop: 0.5 }}/>
                    <Grid item xs>
                        <Typography fontWeight={700}>
                        {application.sender.name} - {role} role
                        </Typography>
                    </Grid>
                </Grid>
                <Divider/>
                <Typography fontSize={14} fontWeight={700} marginTop={1} marginBottom={0.5}>
                    Description
                </Typography>
                <Typography fontSize={14}>
                    {application.description}
                </Typography>
            </CardContent>
            <StyledCardActions>
                <ConfirmationDialog 
                    btnProps={{ color: 'success', title: 'Accept', sx: { height: 30 }}}
                    title='Are you sure you wish to accept this application?'
                    description={
                        `This will give ${application.sender.name} a ${application.role} role in this tournament.`
                    }
                    actionTitle='Accept'
                    action={() => updateStatus(application, ACCEPTED)}/>
                <ConfirmationDialog 
                    btnProps={{ color: 'error', title: 'Reject', sx: { height: 30 }}}
                    title='Are you sure you wish to reject this application?'
                    actionTitle='Reject'
                    action={() => updateStatus(application, REJECTED)}/>
            </StyledCardActions>
        </Card>
    );
}
 
export default StaffApplicationCard;