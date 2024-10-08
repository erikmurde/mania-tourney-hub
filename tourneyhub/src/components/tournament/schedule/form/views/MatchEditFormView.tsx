import { Grid, Typography, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { Schema } from 'yup';
import { UserDtoSimple } from '../../../../../dto/user/UserDtoSimple';
import MultiAutocomplete from '../../../field/MultiAutocomplete';
import PlayerAutocomplete from '../../../field/PlayerAutocomplete';
import TourneyDateTimeField from '../../../field/TourneyDateTimeField';
import { MatchEditDto } from '../../../../../dto/schedule/match/MatchEditDto';

interface IProps {
    initialValues: MatchEditDto,
    selectValues: {
        referees: UserDtoSimple[],
        streamers: UserDtoSimple[],
        commentators: UserDtoSimple[]
    },
    validationSchema: Schema,
    onSubmit: (values: MatchEditDto) => void
}

const MatchEditFormView = ({initialValues, selectValues, validationSchema, onSubmit}: IProps) => {
    return (  
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            enableReinitialize>
            {({ errors }) => (
                <Form id='match-edit-form'>
                    <Grid container rowSpacing={2} columnSpacing={1.5}>
                        <Grid item xs={12}>
                            <Typography>General information</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Field as={TextField}
                                size='small'
                                name='code' 
                                label='Match code' 
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
                                valueId
                                name='refereeId'
                                label='Referee'
                                error={errors.refereeId}
                                options={selectValues.referees}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Field component={PlayerAutocomplete}
                                valueId
                                name='streamerId'
                                label='Streamer'
                                error={errors.streamerId}
                                options={selectValues.streamers}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={MultiAutocomplete}
                                valueId
                                name='commentatorIds'
                                label='Commentators'
                                error={errors.commentatorIds}
                                options={selectValues.commentators}/>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default MatchEditFormView;