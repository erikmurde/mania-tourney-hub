import { Grid, MenuItem, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { StaffApplicationDto } from '../../../../../dto/staffApplication/StaffApplicationDto';
import TourneySelectField from '../../../field/TourneySelectField';

interface IProps {
    initialValues: StaffApplicationDto,
    selectValues: string[],

    onSubmit: (values: StaffApplicationDto) => void
}

const StaffApplicationFormView = ({initialValues, selectValues, onSubmit}: IProps) => {
    return (  
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}>
            <Form id='staff-application-form'>
                <Grid container rowSpacing={2} marginTop={1}>
                    <Grid item xs={6}>
                        <TourneySelectField name='role' label='Desired role' 
                            options={selectValues.map(value => 
                                <MenuItem key={value} value={value}>{value}</MenuItem>
                            )}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field 
                            as={TextField} 
                            name='experience' 
                            label='Do you have any past experience regarding this role?' 
                            fullWidth 
                            multiline 
                            rows={3}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field 
                            as={TextField} 
                            name='motivation' 
                            label='Why do you want this staff role?' 
                            fullWidth 
                            multiline
                            rows={3}/>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    );
}

export default StaffApplicationFormView;