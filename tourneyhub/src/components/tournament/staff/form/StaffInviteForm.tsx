import { Dialog, Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { HOST, ADMIN, MAPPOOLER, MAPPER, PLAYTESTER, REFEREE, STREAMER, COMMENTATOR, SHEETER, GFX, REQUIRED } from '../../../../constants';
import { AuthService } from '../../../../services/authService';
import { IUserDto } from '../../../../dto/IUserDto';
import StaffInviteFormView from './views/StaffInviteFormView';
import { PersonAdd } from '@mui/icons-material';
import { StaffInviteDto } from '../../../../dto/staffInvite/StaffInviteDto';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../../routes/Root';
import { StaffInviteService } from '../../../../services/staffInviteService';
import { Schema, object, string } from 'yup';

const StaffInviteForm = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [selectValues, setSelectValues] = useState({
        users: [] as IUserDto[],
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

    const onSubmit = async(values: StaffInviteDto) => {
        await new StaffInviteService().create(values);
        setOpen(false);
    }

    const validationSchema: Schema = object({
        recipientId: string()
            .required(REQUIRED),
        role: string()
            .required(REQUIRED)
    })

    const initialValues: StaffInviteDto = {
        id: '',
        tournamentId: id!,
        senderId: user!.id,
        recipientId: null,
        role: '',
        status: 'pending',
        reason: ''
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