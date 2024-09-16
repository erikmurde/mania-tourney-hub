import { Grid, MenuItem, TextField } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { StaffInviteDto } from '../../../../../dto/staff/StaffInviteDto';
import { UserDto } from '../../../../../dto/user/UserDto';
import TourneySelectField from '../../../field/TourneySelectField';
import { Schema } from 'yup';
import PlayerAutocomplete from '../../../field/PlayerAutocomplete';

interface IProps {
    initialValues: StaffInviteDto,
    selectValues: {
        users: UserDto[],
        roles: string[]
    },
    validationSchema: Schema,
    onSubmit: (values: StaffInviteDto) => void
}

const StaffInviteFormView = ({initialValues, selectValues, validationSchema, onSubmit}: IProps) => {
    return (  
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            >
            {({ errors }) => (
                <Form id='staff-invite-form'>
                    <Grid container direction='column' rowSpacing={2} marginTop={1}>
                        <Grid item>
                            <Field component={PlayerAutocomplete} 
                                valueId
                                name='recipientId'
                                label='Player'
                                error={errors.recipientId}
                                options={selectValues.users}/>
                        </Grid>
                        <Grid item>
                            <TourneySelectField name='role' label='Staff role' error={errors.role}
                                options={selectValues.roles.map(role => 
                                    <MenuItem key={role} value={role}>{role}</MenuItem>
                                )}/>
                        </Grid>
                        <Grid item>
                            <Field as={TextField} name='reason' label='Reason' fullWidth multiline rows={2}/>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default StaffInviteFormView;