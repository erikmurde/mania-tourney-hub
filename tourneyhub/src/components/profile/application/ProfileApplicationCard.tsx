import { Card, Divider, Grid, Typography, useTheme } from '@mui/material';
import { StaffApplicationDto } from '../../../dto/staffApplication/StaffApplicationDto';
import { StyledCardActions } from '../../styled/StyledCardActions';
import { StyledCardContent } from '../../styled/StyledCardContent';
import ConfirmationDialog from '../../tournament/dialog/ConfirmationDialog';
import { StaffApplicationService } from '../../../services/staffApplicationService';
import { GFX } from '../../../constants';

interface IProps {
    application: StaffApplicationDto,
    navLink: JSX.Element,
    applicationUpdate: number,
    setApplicationUpdate: (update: number) => void
}

const ProfileApplicationCard = ({application, navLink, applicationUpdate, setApplicationUpdate}: IProps) => {
    const theme = useTheme();

    const colorMap = new Map<string, string>([
        ['accepted', theme.palette.success.main],
        ['pending', theme.palette.secondary.main],
        ['rejected', theme.palette.error.main]
    ])

    const onRetract = async() => {
        application.status = 'retracted';
        await new StaffApplicationService().edit(application.id, application);
        setApplicationUpdate(applicationUpdate + 1);
    }

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
            </StyledCardContent>
            {application.status === 'pending' &&
            <StyledCardActions>
                <ConfirmationDialog 
                    title={'Are you sure you wish to retract this application?'} 
                    actionTitle={'Retract'} 
                    action={onRetract}
                    btnProps={{ color: 'error', title: 'Retract' }}/>
            </StyledCardActions>}
        </Card>
    );
}

export default ProfileApplicationCard;