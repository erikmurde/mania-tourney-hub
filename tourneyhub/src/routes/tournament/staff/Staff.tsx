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
    const [listView, setListView] = useState(true);
    const [staff, setStaff] = useState([] as IUserDto[]);
    const [applications, setApplications] = useState([] as StaffApplicationDto[]);
    const authService = new AuthService();
    const staffApplicationService = new StaffApplicationService();

    useEffect(() => {
        if (id) {
            authService
                .getStaff(id)
                .then(staff => setStaff(staff));

            if (user && authService.isHost(user, id)) {
                staffApplicationService
                    .getAllPending(id)
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

    const removeStaffRole = async(member: IUserDto, groupRole: string) => {
        const role = member.roles
            .find(role => role.name === groupRole);

        if (role) {
            member.roles.splice(member.roles.indexOf(role), 1);
            await authService.edit(member.id, member);

            setStaff(staff.map(existing => 
                existing.id === member.id ? member : existing
            ));
        }
    }

    const updateApplicationStatus = async(application: StaffApplicationDto, status: string) => {
        application.status = status;

        if (status === 'accepted') {
            await acceptApplication(application);
        }
        await staffApplicationService
            .edit(application.id, application);

        setApplications(applications.filter(app => 
            app.id !== application.id));
    }

    const acceptApplication = async(application: StaffApplicationDto) => {
        const newMember = await authService.getUser(application.userId);

        newMember.roles.push({
            tournamentId: id!, 
            name: application.role, 
            canRegWithRole: false
        })
        await authService.edit(newMember.id, newMember);

        setStaff(staff.map(existing => 
            existing.id === newMember.id ? newMember : existing
        ));
    }

    const roles = [HOST, MAPPOOLER, MAPPER, PLAYTESTER, REFEREE, STREAMER, COMMENTATOR, SHEETER, GFX];

    return (
        <Grid container direction='column' rowSpacing={2}>
            {user && id && authService.isHost(user, id) && 
            <Grid item>
                <Paper elevation={2} sx={{ paddingBottom: 2, paddingLeft: 5 }}>
                    <Typography variant='h3' fontSize={36} height={80} lineHeight={2}>
                        General
                    </Typography>
                    <Button variant='contained' sx={{ marginRight: 1 }} 
                        startIcon={listView ? <Description/> : <List/>} 
                        onClick={() => setListView(!listView)}
                        >
                        {listView ? 'Staff applications' : 'Staff list'}
                    </Button>
                    <StaffInviteForm/>
                </Paper>
            </Grid>}
            {!listView && 
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
            {listView &&
            <>
            {roles.map(role => {
                const filteredStaff = filterStaff(role);
                return filteredStaff.length > 0 && 
                <StaffGroup 
                    key={role}
                    name={role === GFX 
                        ? 'Graphic Designers' 
                        : `${role[0].toUpperCase()}${role.slice(1)}s`
                    }
                    groupRole={role} 
                    staff={filteredStaff}
                    removeStaffRole={removeStaffRole}/>
            })}
            </>}
        </Grid>
    );
}

export default Staff;