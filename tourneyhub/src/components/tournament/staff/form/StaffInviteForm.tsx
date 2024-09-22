import { Dialog, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { REQUIRED, PENDING } from '../../../../constants';
import { AuthService } from '../../../../services/authService';
import StaffInviteFormView from './views/StaffInviteFormView';
import { PersonAdd } from '@mui/icons-material';
import { StaffInviteDto } from '../../../../dto/staff/invite/StaffInviteDto';
import { StaffInviteService } from '../../../../services/staffInviteService';
import { Schema, number, object, string } from 'yup';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import { UserDtoSimple } from '../../../../dto/user/UserDtoSimple';
import { RoleDto } from '../../../../dto/RoleDto';
import { UserDto } from '../../../../dto/user/UserDto';
import { StaffInviteCreateDto } from '../../../../dto/staff/invite/StaffInviteCreateDto';

interface IProps {
    roles: RoleDto[],
    user: UserDto
}

const StaffInviteForm = ({roles, user}: IProps) => {
    const { tourney } = useTourney();

    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([] as UserDtoSimple[]);

    useEffect(() => {
        if (open) {
            new AuthService()
                .getAllSimple()
                .then(users => setUsers(
                    users.filter(option => option.id !== user.id))
                );
        }
    }, [open]);

    const onSubmit = async(values: StaffInviteCreateDto) => {
        await new StaffInviteService().create(values);
        setOpen(false);
    }

    const validationSchema: Schema = object({
        recipientId: string()
            .required(REQUIRED),
        roleId: string()
            .required(REQUIRED)
    })

    const initialValues: StaffInviteCreateDto = {
        recipientId: '',
        senderId: user.id.toString(),
        tournamentId: tourney.id.toString(),
        roleId: '',
        description: ''
    }

    return (  
        <>
        <Button variant='contained' startIcon={<PersonAdd/>} onClick={() => setOpen(true)}>
            Invite staff
        </Button>
        {open &&
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='xs'>
            <TourneyDialogTitle title='Send staff invite' onClose={() => setOpen(false)}/>
            <StyledDialogContent>
                <StaffInviteFormView 
                    initialValues={initialValues} 
                    selectValues={{ users: users, roles: roles }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}/>
            </StyledDialogContent>
            <StyledDialogActions>
                <Button variant='contained' type='submit' form='staff-invite-form'>
                    Send
                </Button>
            </StyledDialogActions>
        </Dialog>}
        </>
    );
}

export default StaffInviteForm;