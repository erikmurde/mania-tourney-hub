import { Grid, MenuItem, TextField } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import TourneySelectField from '../../../field/TourneySelectField';
import { Schema } from 'yup';
import PlayerAutocomplete from '../../../field/PlayerAutocomplete';
import { UserDtoSimple } from '../../../../../dto/user/UserDtoSimple';
import { RoleDto } from '../../../../../dto/RoleDto';
import { StaffInviteCreateDto } from '../../../../../dto/staff/invite/StaffInviteCreateDto';

interface IProps {
    initialValues: StaffInviteCreateDto,
    selectValues: {
        users: UserDtoSimple[],
        roles: RoleDto[]
    },
    validationSchema: Schema,
    onSubmit: (values: StaffInviteCreateDto) => void
}

const StaffInviteFormView = ({initialValues, selectValues, validationSchema, onSubmit}: IProps) => {
    return (  
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            >
            {({ errors }) => (
                <Form id='staff-invite-form'>
                    <Grid container direction='column' rowSpacing={2} marginTop={0}>
                        <Grid item>
                            <Field component={PlayerAutocomplete} 
                                valueId
                                name='recipientId'
                                label='Player'
                                error={errors.recipientId}
                                options={selectValues.users}/>
                        </Grid>
                        <Grid item>
                            <TourneySelectField name='roleId' label='Staff role' small
                                error={errors.roleId}
                                options={selectValues.roles.map(role => 
                                    <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                                )}/>
                        </Grid>
                        <Grid item>
                            <Field as={TextField} name='description' label='Description' fullWidth multiline rows={2}/>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default StaffInviteFormView;