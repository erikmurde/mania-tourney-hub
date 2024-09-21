import { Dialog, Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { HOST, ADMIN, MAPPOOLER, MAPPER, PLAYTESTER, REFEREE, STREAMER, COMMENTATOR, SHEETER, GFX, REQUIRED, PENDING } from '../../../../constants';
import { AuthService } from '../../../../services/authService';
import { UserDto } from '../../../../dto/user/UserDto';
import StaffInviteFormView from './views/StaffInviteFormView';
import { PersonAdd } from '@mui/icons-material';
import { StaffInviteDto } from '../../../../dto/staff/StaffInviteDto';
import { AuthContext } from '../../../../routes/Root';
import { StaffInviteService } from '../../../../services/staffInviteService';
import { Schema, number, object, string } from 'yup';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';

const StaffInviteForm = () => {
    const { tourney } = useTourney();
    const { user } = useContext(AuthContext);

    const [open, setOpen] = useState(false);
    const [selectValues, setSelectValues] = useState({
        users: [] as UserDto[],
        roles: [HOST, ADMIN, MAPPOOLER, MAPPER, PLAYTESTER, REFEREE, STREAMER, COMMENTATOR, SHEETER, GFX]
    });

    useEffect(() => {
        if (user) {
            new AuthService()
                .getAll()
                .then(users => setSelectValues({
                    ...selectValues, 
                    users: users.filter(option => option.id !== user.id)
                })); 
        }
    }, [user]);

    if (!user) {
        return <></>;
    }

    const onSubmit = async(values: StaffInviteDto) => {
        await new StaffInviteService().create(values);
        setOpen(false);
    }

    const validationSchema: Schema = object({
        recipientId: number()
            .required(REQUIRED),
        role: string()
            .required(REQUIRED)
    })

    const initialValues: StaffInviteDto = {
        id: 0,
        tournament: tourney.name,
        tournamentId: tourney.id,
        sender: user.name,
        recipientId: 0,
        role: '',
        status: PENDING,
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
                    selectValues={selectValues}
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