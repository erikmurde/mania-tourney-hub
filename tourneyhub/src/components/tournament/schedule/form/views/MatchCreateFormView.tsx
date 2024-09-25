import { Grid, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import PlayerAutocomplete from '../../../field/PlayerAutocomplete';
import TourneyDateTimeField from '../../../field/TourneyDateTimeField';
import { Schema } from 'yup';
import { UserDtoSimple } from '../../../../../dto/user/UserDtoSimple';
import { MatchCreateDto } from '../../../../../dto/schedule/match/MatchCreateDto';
import MultiAutocomplete from '../../../field/MultiAutocomplete';
import { TeamDtoSimple } from '../../../../../dto/team/TeamDtoSimple';
import TeamAutocomplete from '../../../field/TeamAutocomplete';

interface IProps {
    initialValues: MatchCreateDto,
    selectValues: {
        players: UserDtoSimple[] | TeamDtoSimple[],
        referees: UserDtoSimple[],
        streamers: UserDtoSimple[],
        commentators: UserDtoSimple[]
    },
    validationSchema: Schema,
    onSubmit: (values: MatchCreateDto) => void
}

const MatchCreateFormView = ({initialValues, selectValues, validationSchema, onSubmit}: IProps) => {

    const isTeam = selectValues.players.length > 0 && 'players' in selectValues.players[0];
    const playerLabel = isTeam ? 'Team' : 'Player';

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
                        <Grid item xs={6}>
                            <Field component={isTeam ? TeamAutocomplete : PlayerAutocomplete}
                                valueId
                                name='player1Id'
                                label={`${playerLabel} 1`}
                                error={errors.player1Id}
                                options={selectValues.players}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Field component={isTeam ? TeamAutocomplete : PlayerAutocomplete}
                                valueId
                                name='player2Id'
                                label={`${playerLabel} 2`}
                                error={errors.player2Id}
                                options={selectValues.players}/>
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

export default MatchCreateFormView;