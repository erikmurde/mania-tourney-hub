import { Grid, MenuItem, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import TourneySelectField from '../../../field/TourneySelectField';
import { Schema } from 'yup';
import { StaffApplicationCreateDto } from '../../../../../dto/staff/application/StaffApplicationCreateDto';
import { RoleDto } from '../../../../../dto/RoleDto';

interface IProps {
    initialValues: StaffApplicationCreateDto,
    roles: RoleDto[],
    validationSchema: Schema,
    onSubmit: (values: StaffApplicationCreateDto) => void
}

const StaffApplicationFormView = ({initialValues, roles, validationSchema, onSubmit}: IProps) => {
    return (  
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            >
            {({ errors }) => (
                <Form id='staff-application-form'>
                    <Grid container rowSpacing={2} marginTop={0}>
                        <Grid item xs>
                            <TourneySelectField name='roleId' label='Desired role' small
                                error={errors.roleId}
                                options={roles.map(role => 
                                    <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                                )}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field fullWidth multiline as={TextField} 
                                name='description' 
                                label='Description'
                                placeholder='Describe your reason for applying and any relevant experience'
                                error={errors.description !== undefined}
                                helperText={errors.description}
                                rows={4}/>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default StaffApplicationFormView;