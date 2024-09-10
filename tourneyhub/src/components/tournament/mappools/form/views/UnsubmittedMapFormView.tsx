import { Field, Form, Formik } from 'formik';
import { IMapDto } from '../../../../../dto/map/IMapDto';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import TourneySelectField from '../../../field/TourneySelectField';

interface IProps {
    initialValues: IMapDto,
    selectValues: string[],
    onSubmit: (values: IMapDto) => void
}

const UnsubmittedMapFormView = ({initialValues, selectValues, onSubmit}: IProps) => {
    return (  
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            validateOnChange={false}
            enableReinitialize
            >
            <Form id='unsubmitted-map-form'>
                <Grid container rowSpacing={2} columnSpacing={1}>
                    <Grid item xs={12} marginTop={1}>
                        <Typography>General information</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Field as={TextField} name='title' label='Title' fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <Field as={TextField} name='diff' label='Difficulty' fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <Field as={TextField} name='artist' label='Artist' fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <Field as={TextField} name='mapper' label='Mapper' fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field as={TextField} name='cover' label='Cover link' fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field as={TextField} name='download' label='Download link' fullWidth/>
                    </Grid>
                    <Grid item xs={12} marginTop={1}>
                        <Typography>Map parameters</Typography>
                    </Grid>
                    <Grid item xs={2.4}>
                        <Field as={TextField} type='number' name='sr' label='Star rating' fullWidth/>
                    </Grid>
                    <Grid item xs={2.4}>
                        <Field as={TextField} type='number' name='bpm' label='BPM' fullWidth/>
                    </Grid>
                    <Grid item xs={2.4}>
                        <Field as={TextField} type='number' name='drainTime' label='Drain time' fullWidth/>
                    </Grid>
                    <Grid item xs={2.4}>
                        <Field as={TextField} type='number' name='hp' label='HP' fullWidth/>
                    </Grid>
                    <Grid item xs={2.4}>
                        <Field as={TextField} type='number' name='od' label='OD' fullWidth/>
                    </Grid>
                    <Grid item xs={12} marginTop={1}>
                        <Typography>Map placement</Typography>
                    </Grid>
                    <Grid item xs={2.4}>
                        <TourneySelectField name='mapType' label='Map type' 
                            options={selectValues.map((value, index) => 
                                <MenuItem key={index} value={value}>{value}</MenuItem>
                            )}/>
                    </Grid>
                    <Grid item xs={2.4}>
                        <Field as={TextField} type='number' name='index' label='Index' fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field as={TextField} name='comment' label='Comment' fullWidth multiline rows={2}/>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    );
}

export default UnsubmittedMapFormView;