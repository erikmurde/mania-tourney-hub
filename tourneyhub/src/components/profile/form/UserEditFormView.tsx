import { Schema } from 'yup';
import { IUserDto } from '../../../dto/user/IUserDto';
import { Field, Form, Formik } from 'formik';
import { Grid, MenuItem, TextField } from '@mui/material';
import TourneySelectField from '../../tournament/field/TourneySelectField';
import { TIMEZONES } from '../../../constants';

interface IProps {
    initialValues: IUserDto,
    validationSchema: Schema,
    onSubmit: (values: IUserDto) => void
}

const UserEditFormView = ({initialValues, validationSchema, onSubmit}: IProps) => {
    return (  
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}>
            {({ errors }) => (
                <Form id='user-edit-form'>
                    <Grid container spacing={1}>
                        <Grid item xs={8}>
                            <Field fullWidth as={TextField} 
                                name='discordUsername' 
                                label='Discord username' 
                                error={errors.discordUsername !== undefined} 
                                helperText={errors.discordUsername}/> 
                        </Grid>
                        <Grid item xs={4}>
                            <TourneySelectField name='timezone' label='Time zone' error={errors.timezone}
                                options={TIMEZONES.map(timezone => 
                                    <MenuItem key={timezone} value={timezone}>
                                        UTC{`${timezone < 0 ? '' : '+'}${timezone}`}
                                    </MenuItem>
                                )}/>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default UserEditFormView;