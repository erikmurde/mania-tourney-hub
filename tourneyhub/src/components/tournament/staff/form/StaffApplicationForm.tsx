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
import { ADMIN, MAPPOOLER, MAPPER, PLAYTESTER, REFEREE, STREAMER, COMMENTATOR, SHEETER, GFX, REQUIRED } from '../../../../constants';
import { StaffApplicationService } from '../../../../services/staffApplicationService';
import { Schema, object, string } from 'yup';

const StaffApplicationForm = ({applicationOpen}: {applicationOpen: boolean}) => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const roles = [ADMIN, MAPPOOLER, MAPPER, PLAYTESTER, REFEREE, STREAMER, COMMENTATOR, SHEETER, GFX];

    const filterRoles = () => {
        if (!user) {
            return [];
        }
        const userRoles = user.roles
            .filter(role => role.tournamentId === id);
    
        return roles.filter(role => 
            userRoles.every(userRole => userRole.name !== role));
    }

    const onSubmit = async(values: StaffApplicationDto) => {
        await new StaffApplicationService().create(values);

        setOpen(false);
    }

    const validationSchema: Schema = object({
        role: string()
            .required(REQUIRED),
        experience: string()
            .required(REQUIRED),
        motivation: string()
            .required(REQUIRED)
    })

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
                    selectValues={filterRoles()} 
                    validationSchema={validationSchema}
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