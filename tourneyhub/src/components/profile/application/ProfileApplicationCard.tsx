import { Card, Divider, Grid, Typography, useTheme } from '@mui/material';
import { StaffApplicationDto } from '../../../dto/staff/application/StaffApplicationDto';
import { StyledCardActions } from '../../styled/StyledCardActions';
import { StyledCardContent } from '../../styled/StyledCardContent';
import ConfirmationDialog from '../../tournament/dialog/ConfirmationDialog';
import { ACCEPTED, GFX, PENDING, REJECTED } from '../../../constants';

interface IProps {
    application: StaffApplicationDto,
    navLink: JSX.Element,
    retractApplication: (application: StaffApplicationDto) => Promise<void>
}

const ProfileApplicationCard = ({application, navLink, retractApplication}: IProps) => {
    const theme = useTheme();

    const colorMap = new Map<string, string>([
        [ACCEPTED, theme.palette.success.main],
        [PENDING, theme.palette.secondary.main],
        [REJECTED, theme.palette.error.main]
    ]);

    const role = application.role === GFX 
        ? 'Graphics designer' 
        : application.role[0].toUpperCase() + application.role.slice(1);

    return (  
        <Card elevation={12}>
            <StyledCardContent>
                <Grid container>
                    <Grid item flexGrow={1}>
                        <Typography>
                            {navLink} - {role} role
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography fontWeight={700} color={colorMap.get(application.status)}>
                            {application.status.toUpperCase()}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ marginTop: 1, marginBottom: 1 }}/>
                <Typography fontSize={14} fontWeight={700} marginTop={1} marginBottom={0.5}>
                    Description
                </Typography>
                <Typography fontSize={14}>
                    {application.description}
                </Typography>
            </StyledCardContent>
            {application.status === PENDING &&
            <StyledCardActions>
                <ConfirmationDialog 
                    title={'Are you sure you wish to retract this application?'} 
                    actionTitle={'Retract'} 
                    action={() => retractApplication(application)}
                    btnProps={{ color: 'error', title: 'Retract' }}/>
            </StyledCardActions>}
        </Card>
    );
}

export default ProfileApplicationCard;