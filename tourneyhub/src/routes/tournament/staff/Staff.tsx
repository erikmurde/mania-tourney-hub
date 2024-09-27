import { Button, Grid, Paper, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { UserDto } from '../../../dto/user/UserDto';
import { AuthService } from '../../../services/authService';
import StaffGroup from '../../../components/tournament/staff/StaffGroup';
import { ACCEPTED, GFX, PLAYER, ROLE_REG } from '../../../constants';
import { Description, List } from '@mui/icons-material';
import { StaffApplicationService } from '../../../services/staffApplicationService';
import { StaffApplicationDto } from '../../../dto/staff/application/StaffApplicationDto';
import StaffApplicationCard from '../../../components/tournament/staff/StaffApplicationCard';
import StaffInviteForm from '../../../components/tournament/staff/form/StaffInviteForm';
import { AuthContext } from '../../Root';
import { StatusService } from '../../../services/statusService';
import { RoleService } from '../../../services/roleService';
import { RoleDto } from '../../../dto/RoleDto';
import { useTourney } from '../TournamentHeader';

const Staff = () => {
    const { tourney } = useTourney();
    const { user } = useContext(AuthContext);

    const [listView, setListView] = useState(true);
    const [staff, setStaff] = useState([] as UserDto[]);
    const [roles, setRoles] = useState([] as RoleDto[]);
    const [applications, setApplications] = useState([] as StaffApplicationDto[]);
    
    const authService = new AuthService();
    const staffApplicationService = new StaffApplicationService();

    useEffect(() => {
        authService
            .getStaff(tourney.id)
            .then(staff => setStaff(staff));

        new RoleService()
            .getAll()
            .then(roles => setRoles(roles.filter(role => role.name !== PLAYER)));

        if (user && authService.isHost(user, tourney.id)) {
            staffApplicationService
                .getAllPending(tourney.id)
                .then(applications => setApplications(applications));
        }
    }, [tourney.id, user]);

    const filterStaff = (role: string) => {
        return staff.filter(user => 
            user.roles
                .filter(tourneyRole => tourneyRole.tournamentId === tourney.id)
                .map(tourneyRole => tourneyRole.role)
                .includes(role));
    }

    const removeStaffRole = async(member: UserDto, groupRole: string) => {
        const role = member.roles
            .find(tourneyRole => tourneyRole.role === groupRole);

        if (role) {
            member.roles.splice(member.roles.indexOf(role), 1);
            await authService.removeUserRole(member.id, tourney.id, role.role);

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
            senderPlayerId: application.sender.playerId,
            tournamentId: application.tournamentId,
            statusId: updatedStatus.id
        });
        setApplications(
            applications.filter(app => app.id !== application.id)
        );
    }

    const acceptApplication = async(application: StaffApplicationDto) => {
        const userId = application.sender.playerId;
        const role = {
            userId: userId,
            tournamentId: tourney.id,
            tournament: tourney.name,
            role: application.role, 
            canRegWithRole: ROLE_REG.get(application.role)!,
            concluded: tourney.concluded
        };
        setStaff(staff.map(existing => 
            existing.playerId === userId 
                ? { ...existing, roles: [...existing.roles, role] } 
                : existing
        ));
    }

    return (
        <Grid container direction='column' rowSpacing={2}>
            {user && authService.isHost(user, tourney.id) && 
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
                    <StaffInviteForm roles={roles} user={user}/>
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