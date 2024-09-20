import StaffApplicationFormView from './views/StaffApplicationFormView';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../routes/Root';
import { useParams } from 'react-router-dom';
import { REQUIRED, PENDING, LOGIN_URL } from '../../../../constants';
import { Schema, object, string } from 'yup';
import FormDialogBase from '../../dialog/FormDialogBase';
import { StaffApplicationService } from '../../../../services/staffApplicationService';
import { StaffApplicationCreateDto } from '../../../../dto/staff/application/StaffApplicationCreateDto';
import { RoleDto } from '../../../../dto/RoleDto';
import { RoleService } from '../../../../services/roleService';
import { StatusService } from '../../../../services/statusService';

interface IProps {
    applicationOpen: boolean
}

const StaffApplicationForm = ({applicationOpen}: IProps) => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [roles, setRoles] = useState([] as RoleDto[]);

    useEffect(() => {
        if (open && roles.length === 0) {
            new RoleService()
                .getAll()
                .then(roles => setRoles(roles));
        }
    }, [open, roles.length]);

    if (!user || !id) {
        return <></>;
    }
    
    const filterRoles = () => {
        const userRoles = user.roles
            .filter(role => role.tournamentId === id);

        return roles.filter(role => 
            userRoles.every(userRole => userRole.name !== role.name));
    }

    const onSubmit = async(values: StaffApplicationCreateDto) => {
        const status = await new StatusService()
            .getByName(PENDING);

        if (status) {
            values.statusId = status.id;
            await new StaffApplicationService().create(values);
    
            setOpen(false);
        }
    }

    const validationSchema: Schema = object({
        roleId: string()
            .required(REQUIRED),
        description: string()
            .required(REQUIRED)
    })

    const initialValues: StaffApplicationCreateDto = {
        playerId: user.playerId,
        senderId: user.id,
        tournamentId: id,
        roleId: '',
        statusId: '',
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
                    roles={filterRoles()} 
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}/>
            }/>
    );
}
 
export default StaffApplicationForm;