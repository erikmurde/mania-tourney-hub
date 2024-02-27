import { Autocomplete, Box, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { StaffInviteDto } from '../../../../../dto/staffInvite/StaffInviteDto';
import { IUserDto } from '../../../../../dto/IUserDto';
import { SyntheticEvent } from 'react';
import TourneySelectField from '../../../field/TourneySelectField';
import Flag from '../../../../Flag';

interface IProps {
    initialValues: StaffInviteDto,
    selectValues: {
        users: IUserDto[],
        roles: string[]
    }
    onSubmit: (values: StaffInviteDto) => void
}

const StaffInviteFormView = ({initialValues, selectValues, onSubmit}: IProps) => {
    return (  
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}>
            {({ setFieldValue }) => (
                <Form id='staff-invite-form'>
                    <Grid container direction='column' rowSpacing={2} marginTop={1}>
                        <Grid item>
                            <Autocomplete
                                options={selectValues.users}
                                getOptionLabel={(option: IUserDto) => option.name}
                                onChange={(e: SyntheticEvent, value: IUserDto | null) => 
                                    setFieldValue('recipientId', value?.id)
                                }
                                renderOption={(props: any, option: IUserDto) => (
                                    <Box {...props}>
                                        <Flag country={option.country}/>
                                        <Typography marginLeft={1}>
                                            {option.name}
                                        </Typography>
                                    </Box>
                                )}
                                renderInput={(props: any) => (
                                    <Field component={TextField} name='recipientId' label='Player' {...props}/>
                                )}/>
                        </Grid>
                        <Grid item>
                            <TourneySelectField name='role' label='Staff role' 
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