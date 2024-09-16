import { Grid, MenuItem, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { StaffApplicationDto } from '../../../../../dto/staff/StaffApplicationDto';
import TourneySelectField from '../../../field/TourneySelectField';
import { Schema } from 'yup';

interface IProps {
    initialValues: StaffApplicationDto,
    selectValues: string[],
    validationSchema: Schema,
    onSubmit: (values: StaffApplicationDto) => void
}

const StaffApplicationFormView = ({initialValues, selectValues, validationSchema, onSubmit}: IProps) => {
    return (  
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}>
            {({ errors }) => (
                <Form id='staff-application-form'>
                    <Grid container rowSpacing={2} marginTop={1}>
                        <Grid item xs={6}>
                            <TourneySelectField name='role' label='Desired role' error={errors.role}
                                options={selectValues.map(value => 
                                    <MenuItem key={value} value={value}>{value}</MenuItem>
                                )}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field fullWidth multiline as={TextField} 
                                name='experience' 
                                label='Description'
                                placeholder='Describe your reason for applying and any relevant experience'
                                error={errors.description !== undefined}
                                helperText={errors.description}
                                rows={3}/>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default StaffApplicationFormView;