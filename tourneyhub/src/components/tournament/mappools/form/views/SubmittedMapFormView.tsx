import { Grid, MenuItem, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { ISubmittedMapDto } from '../../../../../dto/map/ISubmittedMapDto';
import { MAP_TYPES, TB } from '../../../../../constants';
import TourneySelectField from '../../../field/TourneySelectField';
import { Schema } from 'yup';

interface IProps {
    initialValues: ISubmittedMapDto,
    validationSchema: Schema,
    onSubmit: (values: ISubmittedMapDto) => void
}

const SubmittedMapFormView = ({initialValues, validationSchema, onSubmit}: IProps) => {
    return (  
        <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnChange={false}
            onSubmit={onSubmit}
            >
            {({ values, errors }) => 
            <Form id='submitted-map-form'>
                <Grid container rowSpacing={1.5} columnSpacing={1} marginTop={1}>
                    <Grid item xs={12}>
                        <Field as={TextField} name='beatmapId' label='Beatmap ID' type='number' fullWidth
                            error={errors.beatmapId !== undefined}
                            helperText={errors.beatmapId}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TourneySelectField name='mapType' label='Map type' 
                            error={errors.mapType}
                            options={MAP_TYPES.map((value, index) => 
                                <MenuItem key={index} value={value}>{value}</MenuItem>
                            )}/>
                    </Grid>
                    {values.mapType !== TB &&
                    <Grid item xs={6}>
                        <Field as={TextField} name='index' label='Index' type='number' fullWidth
                            error={errors.index !== undefined}
                            helperText={errors.index}/>
                    </Grid>}
                    <Grid item xs={12}>
                        <Field as={TextField} name='comment' label='Comment' fullWidth multiline rows={2}/>
                    </Grid>
                </Grid>
            </Form>
            }
        </Formik>
    );
}
 
export default SubmittedMapFormView;