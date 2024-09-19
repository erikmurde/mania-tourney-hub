import StaffApplicationFormView from './views/StaffApplicationFormView';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../routes/Root';
import { StaffApplicationDto } from '../../../../dto/staff/StaffApplicationDto';
import { useParams } from 'react-router-dom';
import { ADMIN, MAPPOOLER, MAPPER, PLAYTESTER, REFEREE, STREAMER, COMMENTATOR, SHEETER, GFX, REQUIRED, PENDING, LOGIN_URL } from '../../../../constants';
import { StaffApplicationService } from '../../../../services/staffApplicationService';
import { Schema, object, string } from 'yup';
import FormDialogBase from '../../dialog/FormDialogBase';

interface IProps {
    applicationOpen: boolean,
    tourneyName: string
}

const StaffApplicationForm = ({applicationOpen, tourneyName}: IProps) => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const roles = [ADMIN, MAPPOOLER, MAPPER, PLAYTESTER, REFEREE, STREAMER, COMMENTATOR, SHEETER, GFX];

    if (!user || !id) {
        return <></>;
    }
    
    const filterRoles = () => {
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
        senderId: user.id,
        tournamentId: id,
        tournament: tourneyName,
        role: '',
        status: PENDING,
        description: ''
    }

    return (  
        <FormDialogBase 
            title={'Apply for staff'} 
            submitActionName={'Apply'}
            formName={'staff-application-form'} 
            open={open}
            setOpen={setOpen}
            btnProps={{
                onClick: () => user ? setOpen(true) : window.location.assign(LOGIN_URL),
                title: applicationOpen ? 'Apply for staff' : 'Staff applications closed',
                disabled: !applicationOpen
            }}
            form={
                <StaffApplicationFormView 
                    initialValues={initialValues} 
                    selectValues={filterRoles()} 
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}/>
            }/>
    );
}
 
export default StaffApplicationForm;