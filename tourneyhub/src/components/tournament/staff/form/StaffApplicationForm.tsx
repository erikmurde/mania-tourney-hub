import { Button, Dialog } from '@mui/material';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import StaffApplicationFormView from './views/StaffApplicationFormView';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../routes/Root';
import { AuthService } from '../../../../services/authService';
import { StaffApplicationDto } from '../../../../dto/staffApplication/StaffApplicationDto';
import { useParams } from 'react-router-dom';
import { HOST, ADMIN, MAPPOOLER, MAPPER, PLAYTESTER, REFEREE, STREAMER, COMMENTATOR, SHEETER, GFX } from '../../../../constants';
import { StaffApplicationService } from '../../../../services/staffApplicationService';

const StaffApplicationForm = ({applicationOpen}: {applicationOpen: boolean}) => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const roles = [HOST, ADMIN, MAPPOOLER, MAPPER, PLAYTESTER, REFEREE, STREAMER, COMMENTATOR, SHEETER, GFX];

    const onSubmit = async(values: StaffApplicationDto) => {
        await new StaffApplicationService().create(values);

        setOpen(false);
    }

    const initialValues: StaffApplicationDto = {
        id: '',
        userId: user?.id ?? '',
        tournamentId: id ?? '',
        role: '',
        status: 'pending',
        experience: '',
        motivation: ''
    }

    return (  
        <>
        <Button variant='contained' disabled={!applicationOpen} 
            onClick={() => {
                user ? setOpen(true) : new AuthService().login()
            }}>
            {applicationOpen ? 'apply for staff' : 'applications closed'}
        </Button>
        {open &&
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='sm'>
            <TourneyDialogTitle title='Apply for staff' onClose={() => setOpen(false)}/>
            <StyledDialogContent>
                <StaffApplicationFormView 
                    initialValues={initialValues} 
                    selectValues={roles} 
                    onSubmit={onSubmit}/>
            </StyledDialogContent>
            <StyledDialogActions>
                <Button variant='contained' type='submit' form='staff-application-form'>
                    Apply
                </Button>
            </StyledDialogActions>
        </Dialog>}
        </>
    );
}
 
export default StaffApplicationForm;