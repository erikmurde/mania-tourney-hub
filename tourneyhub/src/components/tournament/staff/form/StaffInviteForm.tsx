import { Dialog, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { REQUIRED } from '../../../../constants';
import { AuthService } from '../../../../services/authService';
import StaffInviteFormView from './views/StaffInviteFormView';
import { PersonAdd } from '@mui/icons-material';
import { StaffInviteService } from '../../../../services/staffInviteService';
import { Schema, object, string } from 'yup';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import { UserDtoSimple } from '../../../../dto/user/UserDtoSimple';
import { RoleDto } from '../../../../dto/RoleDto';
import { UserDto } from '../../../../dto/user/UserDto';
import { StaffInviteCreateDto } from '../../../../dto/staff/invite/StaffInviteCreateDto';
import LoadingButton from '../../../LoadingButton';

interface IProps {
    roles: RoleDto[],
    user: UserDto
}

const StaffInviteForm = ({roles, user}: IProps) => {
    const { tourney } = useTourney();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
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
        senderId: user.id,
        tournamentId: tourney.id,
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
                    onSubmit={async(values) => {
                        setLoading(true);
                        await onSubmit(values);
                        setLoading(false);
                    }}/>
            </StyledDialogContent>
            <StyledDialogActions>
                <LoadingButton loading={loading} type='submit' form='staff-invite-form'
                    sx={{ width: 80 }}>
                    Send
                </LoadingButton>
            </StyledDialogActions>
        </Dialog>}
        </>
    );
}

export default StaffInviteForm;