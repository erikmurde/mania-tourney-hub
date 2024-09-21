import { Field, Form, Formik } from 'formik';
import { IMapDto } from '../../../../../dto/map/IMapDto';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import TourneySelectField from '../../../field/TourneySelectField';
import { Schema } from 'yup';
import { MAP_TYPES, TB } from '../../../../../constants';

interface IProps {
    initialValues: IMapDto,
    validationSchema: Schema,
    onSubmit: (values: IMapDto) => void
}

const UnsubmittedMapFormView = ({initialValues, validationSchema, onSubmit}: IProps) => {
    const edit = initialValues.id !== 0;

    return (  
        <Formik 
            initialValues={initialValues} 
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={false}
            enableReinitialize
            >
            {({ values, errors }) => 
            <Form id='unsubmitted-map-form'>
                <Grid container rowSpacing={1.5} columnSpacing={1}>
                    <Grid item xs={12} marginTop={1}>
                        <Typography>General information</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Field as={TextField} name='title' label='Title' fullWidth
                            error={errors.title !== undefined}
                            helperText={errors.title}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Field as={TextField} name='diff' label='Difficulty' fullWidth
                            error={errors.diff !== undefined}
                            helperText={errors.diff}/>
                    </Grid>
                    {edit && 
                    <Grid item xs={4}>
                        <Field as={TextField} type='number' name='beatmapId' label='Beatmap ID' fullWidth
                            error={errors.beatmapId !== undefined}
                            helperText={errors.beatmapId}/>
                    </Grid>}
                    <Grid item xs={edit ? 4 : 6}>
                        <Field as={TextField} name='artist' label='Artist' fullWidth
                            error={errors.artist !== undefined}
                            helperText={errors.artist}/>
                    </Grid>
                    <Grid item xs={edit ? 4 : 6}>
                        <Field as={TextField} name='mapper' label='Mapper' fullWidth
                            error={errors.mapper !== undefined}
                            helperText={errors.mapper}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Field as={TextField} name='cover' label='Cover link' fullWidth
                            error={errors.cover !== undefined}
                            helperText={errors.cover}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Field as={TextField} name='download' label='Download link' fullWidth
                            error={errors.download !== undefined}
                            helperText={errors.download}/>
                    </Grid>
                    <Grid item xs={12} marginTop={1}>
                        <Typography>Map parameters</Typography>
                    </Grid>
                    <Grid item xs={2.4}>
                        <Field as={TextField} type='number' name='sr' label='Star rating' fullWidth
                            error={errors.sr !== undefined}
                            helperText={errors.sr}/>
                    </Grid>
                    <Grid item xs={2.4}>
                        <Field as={TextField} type='number' name='bpm' label='BPM' fullWidth
                            error={errors.bpm !== undefined}
                            helperText={errors.bpm}/>
                    </Grid>
                    <Grid item xs={2.4}>
                        <Field as={TextField} type='number' name='drainTime' label='Drain time (sec)' fullWidth
                            error={errors.drainTime !== undefined}
                            helperText={errors.drainTime}/>
                    </Grid>
                    <Grid item xs={2.4}>
                        <Field as={TextField} type='number' name='hp' label='HP' fullWidth
                            error={errors.hp !== undefined}
                            helperText={errors.hp}/>
                    </Grid>
                    <Grid item xs={2.4}>
                        <Field as={TextField} type='number' name='od' label='OD' fullWidth
                            error={errors.od !== undefined}
                            helperText={errors.od}/>
                    </Grid>
                    <Grid item xs={12} marginTop={1}>
                        <Typography>Map placement</Typography>
                    </Grid>
                    <Grid item xs={2.4}>
                        <TourneySelectField name='mapType' label='Map type' 
                            error={errors.mapType}
                            options={MAP_TYPES.map((value, index) => 
                                <MenuItem key={index} value={value}>{value}</MenuItem>
                            )}/>
                    </Grid>
                    {values.mapType !== TB &&
                    <Grid item xs={2.4}>
                        <Field as={TextField} type='number' name='index' label='Index' fullWidth
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

export default UnsubmittedMapFormView;