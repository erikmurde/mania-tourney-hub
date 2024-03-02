import { Button, Grid, Paper, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { IUserDto } from '../../../dto/IUserDto';
import { AuthService } from '../../../services/authService';
import { useParams } from 'react-router-dom';
import StaffGroup from '../../../components/tournament/staff/StaffGroup';
import { COMMENTATOR, GFX, HOST, MAPPER, MAPPOOLER, PLAYTESTER, REFEREE, SHEETER, STREAMER } from '../../../constants';
import { Description, List } from '@mui/icons-material';
import { StaffApplicationService } from '../../../services/staffApplicationService';
import { StaffApplicationDto } from '../../../dto/staffApplication/StaffApplicationDto';
import StaffApplicationCard from '../../../components/tournament/staff/StaffApplicationCard';
import StaffInviteForm from '../../../components/tournament/staff/form/StaffInviteForm';
import { AuthContext } from '../../Root';

const Staff = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [list, setList] = useState(true);
    const [staff, setStaff] = useState([] as IUserDto[]);
    const [applications, setApplications] = useState([] as StaffApplicationDto[]);
    const service = new AuthService();

    useEffect(() => {
        if (id) {
            service
                .getStaff(id)
                .then(staff => setStaff(staff));

            if (user && service.isHost(user, id)) {
                new StaffApplicationService()
                    .getAllPending()
                    .then(applications => setApplications(applications));
            }
        }
    }, [id, user]);

    const filterStaff = (role: string) => {
        return staff.filter(user => 
            user.roles
                .map(role => role.name)
                .includes(role));
    }

    const updateApplicationStatus = async(application: StaffApplicationDto, status: string) => {
        application.status = status;

        await new StaffApplicationService()
            .edit(application.id, application);

        setApplications(applications.filter(app => 
            app.id !== application.id));
    }

    const hosts = filterStaff(HOST);
    const mappoolers = filterStaff(MAPPOOLER);
    const mappers = filterStaff(MAPPER);
    const playtesters = filterStaff(PLAYTESTER);
    const referees = filterStaff(REFEREE);
    const streamers = filterStaff(STREAMER);
    const commentators = filterStaff(COMMENTATOR);
    const sheeters = filterStaff(SHEETER);
    const gfx = filterStaff(GFX);

    return (
        <Grid container direction='column' rowSpacing={2}>
            {user && id && service.isHost(user, id) && 
            <Grid item>
                <Paper elevation={2} sx={{ paddingBottom: 2, paddingLeft: 5 }}>
                    <Typography variant='h3' fontSize={36} height={80} lineHeight={2}>
                        General
                    </Typography>
                    <Button variant='contained' sx={{ marginRight: 1 }} 
                        startIcon={list ? <Description/> : <List/>} 
                        onClick={() => setList(!list)}
                        >
                        {list ? 'Staff applications' : 'Staff list'}
                    </Button>
                    <StaffInviteForm/>
                </Paper>
            </Grid>}
            {!list && 
            <Grid item>
                <Paper elevation={2} sx={{ paddingBottom: 2 }}>
                    <Typography 
                        variant='h3' 
                        fontSize={36} 
                        height={80} 
                        lineHeight={2} 
                        marginLeft={5} 
                        marginBottom={2}
                        >
                        Staff applications
                    </Typography>
                    <Grid container spacing={2} justifyContent='center'>
                        {applications.map(application => 
                            <Grid item key={application.id}>
                                <StaffApplicationCard 
                                    application={application} 
                                    updateStatus={updateApplicationStatus}/>
                            </Grid>
                        )}
                    </Grid>
                </Paper>
            </Grid>}
            {list &&
            <>
            {hosts.length > 0 && <StaffGroup name='Hosts' staff={hosts}/>}
            {mappoolers.length > 0 && <StaffGroup name='Mappoolers' staff={mappoolers}/>}
            {mappers.length > 0 && <StaffGroup name='Mappers' staff={mappers}/>}
            {playtesters.length > 0 && <StaffGroup name='Playtesters' staff={playtesters}/>}
            {referees.length > 0 && <StaffGroup name='Referees' staff={referees}/>}
            {streamers.length > 0 && <StaffGroup name='Streamers' staff={streamers}/>}
            {commentators.length > 0 && <StaffGroup name='Commentators' staff={commentators}/>}
            {sheeters.length > 0 && <StaffGroup name='Sheeters' staff={sheeters}/>}
            {gfx.length > 0 && <StaffGroup name='Graphic Designers' staff={gfx}/>}
            </>}
        </Grid>
    );
}

export default Staff;