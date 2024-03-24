import { Grid, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import PlayerAutocomplete from '../../../field/PlayerAutocomplete';
import TourneyDateTimeField from '../../../field/TourneyDateTimeField';
import { Schema } from 'yup';
import { EventParticipantDto } from '../../../../../dto/user/EventParticipantDto';
import { MatchCreateDto } from '../../../../../dto/schedule/MatchCreateDto';
import MultiAutocomplete from '../../../field/MultiAutocomplete';

interface IProps {
    initialValues: MatchCreateDto,
    selectValues: {
        players: EventParticipantDto[],
        referees: EventParticipantDto[],
        streamers: EventParticipantDto[],
        commentators: EventParticipantDto[]
    },
    validationSchema: Schema,
    onSubmit: (values: MatchCreateDto) => void
}

const MatchCreateFormView = ({initialValues, selectValues, validationSchema, onSubmit}: IProps) => {
    return (  
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}>
            {({ errors }) => (
                <Form id='match-create-form'>
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
                        <Grid item xs={6}>
                            <Field component={PlayerAutocomplete}
                                name='player1'
                                label='Player 1'
                                error={errors.player1}
                                options={selectValues.players}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Field component={PlayerAutocomplete}
                                name='player2'
                                label='Player 2'
                                error={errors.player2}
                                options={selectValues.players}/>
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

export default MatchCreateFormView;