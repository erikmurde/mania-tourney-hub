import { Button, Grid, Paper, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { UserDto } from '../../../dto/user/UserDto';
import { AuthService } from '../../../services/authService';
import { useParams } from 'react-router-dom';
import StaffGroup from '../../../components/tournament/staff/StaffGroup';
import { ACCEPTED, COMMENTATOR, GFX, HOST, MAPPER, MAPPOOLER, PLAYTESTER, REFEREE, ROLE_REG, SHEETER, STREAMER } from '../../../constants';
import { Description, List } from '@mui/icons-material';
import { StaffApplicationService } from '../../../services/staffApplicationService';
import { StaffApplicationDto } from '../../../dto/staff/application/StaffApplicationDto';
import StaffApplicationCard from '../../../components/tournament/staff/StaffApplicationCard';
import StaffInviteForm from '../../../components/tournament/staff/form/StaffInviteForm';
import { AuthContext } from '../../Root';
import { StatusService } from '../../../services/statusService';
import { RoleService } from '../../../services/roleService';
import { RoleDto } from '../../../dto/RoleDto';

const Staff = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();

    const [listView, setListView] = useState(true);
    const [staff, setStaff] = useState([] as UserDto[]);
    const [roles, setRoles] = useState([] as RoleDto[]);
    const [applications, setApplications] = useState([] as StaffApplicationDto[]);
    
    const authService = new AuthService();
    const staffApplicationService = new StaffApplicationService();

    useEffect(() => {
        if (id) {
            authService
                .getStaff(id)
                .then(staff => setStaff(staff));

            new RoleService()
                .getAll()
                .then(roles => setRoles(roles));

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

    const removeStaffRole = async(member: UserDto, groupRole: string) => {
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

    const updateApplicationStatus = async(application: StaffApplicationDto, newStatus: string) => {
        const updatedStatus = await new StatusService()
            .getByName(newStatus);

        if (!updatedStatus) {
            return;
        }
        if (updatedStatus.name === ACCEPTED) {
            await acceptApplication(application);
        }
        await staffApplicationService.edit(application.id, {
            playerId: application.sender.playerId,
            tournamentId: application.tournamentId,
            statusId: updatedStatus.id
        });
        setApplications(
            applications.filter(app => app.id !== application.id)
        );
    }

    const acceptApplication = async(application: StaffApplicationDto) => {

        //TODO fetch updated user from backend and replace in staff list

        const userId = application.sender.playerId;
        const role = {
            userId: userId,
            tournamentId: id!, 
            name: application.role, 
            canRegWithRole: ROLE_REG.get(application.role)!
        };
        setStaff(staff.map(existing => 
            existing.playerId === userId 
                ? { ...existing, roles: [...existing.roles, role] } 
                : existing
        ));
    }

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
                const filteredStaff = filterStaff(role.name);
                return <StaffGroup 
                    key={role.id}
                    name={role.name === GFX 
                        ? 'Graphic Designers' 
                        : `${role.name[0].toUpperCase()}${role.name.slice(1)}s`
                    }
                    groupRole={role.name} 
                    staff={filteredStaff}
                    removeStaffRole={removeStaffRole}/>
            })}
            </>}
        </Grid>
    );
}

export default Staff;