import { Grid, Typography, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { Schema } from 'yup';
import { MatchCreateDto } from '../../../../../dto/schedule/MatchCreateDto';
import { UserDtoSimple } from '../../../../../dto/user/UserDtoSimple';
import MultiAutocomplete from '../../../field/MultiAutocomplete';
import PlayerAutocomplete from '../../../field/PlayerAutocomplete';
import TourneyDateTimeField from '../../../field/TourneyDateTimeField';

interface IProps {
    initialValues: MatchCreateDto,
    selectValues: {
        referees: UserDtoSimple[],
        streamers: UserDtoSimple[],
        commentators: UserDtoSimple[]
    },
    validationSchema: Schema,
    onSubmit: (values: MatchCreateDto) => void
}

const MatchEditFormView = ({initialValues, selectValues, validationSchema, onSubmit}: IProps) => {
    return (  
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}>
            {({ errors }) => (
                <Form id='match-edit-form'>
                    <Grid container rowSpacing={2} columnSpacing={1} marginTop={1}>
                        <Grid item xs={12}>
                            <Typography>General information</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Field as={TextField} 
                                name='code' 
                                label='Match ID' 
                                error={errors.code !== undefined}
                                helperText={errors.code} 
                                fullWidth/>
                        </Grid>
                        <Grid item xs={6}>
                            <Field component={TourneyDateTimeField} 
                                name='time' 
                                label='Match time'
                                error={errors.time}/>
                        </Grid>
                        <Grid item xs={12} marginTop={1}>
                            <Typography>Related staff</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Field component={PlayerAutocomplete}
                                name='referee'
                                label='Referee'
                                error={errors.referee}
                                options={selectValues.referees}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Field component={PlayerAutocomplete}
                                name='streamer'
                                label='Streamer'
                                error={errors.streamer}
                                options={selectValues.streamers}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={MultiAutocomplete}
                                name='commentators'
                                label='Commentators'
                                error={errors.commentators}
                                options={selectValues.commentators}/>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default MatchEditFormView;