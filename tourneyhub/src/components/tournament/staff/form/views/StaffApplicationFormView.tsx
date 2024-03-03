import { Grid, MenuItem, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { StaffApplicationDto } from '../../../../../dto/staffApplication/StaffApplicationDto';
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
                                label='Do you have any past experience regarding this role?'
                                error={errors.experience !== undefined}
                                helperText={errors.experience}
                                rows={3}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field fullWidth multiline as={TextField} 
                                name='motivation' 
                                label='Why do you want this staff role?'
                                error={errors.motivation !== undefined}
                                helperText={errors.motivation}             
                                rows={3}/>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default StaffApplicationFormView;