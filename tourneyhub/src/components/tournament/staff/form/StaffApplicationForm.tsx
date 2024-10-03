import StaffApplicationFormView from './views/StaffApplicationFormView';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../routes/Root';
import { REQUIRED, PENDING, LOGIN_URL } from '../../../../constants';
import { Schema, number, object, string } from 'yup';
import FormDialogBase from '../../dialog/FormDialogBase';
import { StaffApplicationService } from '../../../../services/staffApplicationService';
import { StaffApplicationCreateDto } from '../../../../dto/staff/application/StaffApplicationCreateDto';
import { RoleDto } from '../../../../dto/RoleDto';
import { RoleService } from '../../../../services/roleService';
import { StatusService } from '../../../../services/statusService';
import { TournamentDto } from '../../../../dto/tournament/TournamentDto';
import LoadingButton from '../../../LoadingButton';

const StaffApplicationForm = ({tourney}: {tourney: TournamentDto}) => {
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([] as RoleDto[]);

    useEffect(() => {
        if (open && roles.length === 0) {
            new RoleService()
                .getAll()
                .then(roles => setRoles(roles));
        }
    }, [open, roles.length]);

    if (!user) {
        return <></>;
    }
    
    const filterRoles = () => {
        const userRoles = user.roles
            .filter(role => role.tournamentId === tourney.id);

        return roles.filter(role => 
            userRoles.every(userRole => userRole.role !== role.name));
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
        roleId: number()
            .required(REQUIRED),
        description: string()
            .required(REQUIRED)
    })

    const initialValues: StaffApplicationCreateDto = {
        senderId: user.id,
        tournamentId: tourney.id,
        roleId: '',
        statusId: '',
        description: ''
    }

    return (  
        <FormDialogBase 
            title={'Apply for staff'}
            open={open}
            setOpen={setOpen}
            btnProps={{
                onClick: () => user ? setOpen(true) : window.location.assign(LOGIN_URL),
                title: tourney.applicationsOpen ? 'Apply for staff' : 'Staff applications closed',
                disabled: !tourney.applicationsOpen
            }}
            form={
                <StaffApplicationFormView 
                    initialValues={initialValues} 
                    roles={filterRoles()} 
                    validationSchema={validationSchema}
                    onSubmit={async(values) => {
                        setLoading(true);
                        await onSubmit(values);
                        setLoading(false);
                }}/>
            }
            submitBtn={
                <LoadingButton loading={loading} type='submit' form='staff-application-form'
                    sx={{ width: 90 }}>
                    Apply
                </LoadingButton>
            }/>
    );
}
 
export default StaffApplicationForm;