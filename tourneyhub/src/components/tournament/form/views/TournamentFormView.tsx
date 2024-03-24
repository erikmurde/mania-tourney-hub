import { Schema } from 'yup';
import { FastField, Field, Form, Formik } from 'formik';
import { Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@mui/material';
import { TournamentEdit } from '../../../../domain/TournamentEdit';
import { ADMIN, COMMENTATOR, COUNTRIES, GFX, HOST, MAPPER, MAPPOOLER, PLAYTESTER, REFEREE, SHEETER, STREAMER } from '../../../../constants';
import MultiAutocomplete from '../../field/MultiAutocomplete';
import RoleAutocomplete from '../../field/RoleAutocomplete';
import TourneyDateField from '../../field/TourneyDateField';

interface IProps {
    initialValues: TournamentEdit,
    validationSchema: Schema,
    onSubmit: (values: TournamentEdit) => void
}

const TournamentFormView = ({initialValues, validationSchema, onSubmit}: IProps) => {
    const roles = [HOST, ADMIN, MAPPOOLER, MAPPER, PLAYTESTER, REFEREE, STREAMER, COMMENTATOR, SHEETER, GFX];

    return (  
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}>
            {({ errors, values }) => (
                <Form id='tourney-form'>
                    <Grid container rowSpacing={2} columnSpacing={1} marginTop={0.5}>
                        <Grid item xs={12}>
                            <Typography fontSize={18} fontWeight={500}>
                                General information
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <FastField as={TextField} name='name' label='Name' 
                                error={errors.name !== undefined}
                                helperText={errors.name} 
                                fullWidth/>
                        </Grid>
                        <Grid item xs={3}>
                            <FastField as={TextField} name='code' label='Code' 
                                error={errors.code !== undefined}
                                helperText={errors.code} 
                                fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <FastField fullWidth multiline as={TextField} name='description' label='Description'
                                error={errors.description !== undefined}
                                helperText={errors.description}             
                                rows={3}/>
                        </Grid>
                        {!values.public &&
                        <Grid item xs={2}>
                            <FastField as={TextField} name='keys' label='Keycount' type='number'
                                error={errors.keys !== undefined}
                                helperText={errors.keys} 
                                fullWidth/>
                        </Grid>}
                        <Grid item xs={values.public ? 12 : 10}>
                            <FastField as={TextField} name='banner' label='Banner image link' 
                                error={errors.banner !== undefined}
                                helperText={errors.banner} 
                                fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <FastField as={TextField} name='regMessage' label='Registration message' 
                                error={errors.regMessage !== undefined}
                                helperText={errors.regMessage} 
                                fullWidth/>
                        </Grid>
                        <Grid item xs={8}>
                            <FastField component={RoleAutocomplete} name='hostRoles' label='Your roles'
                                valueId
                                error={errors.hostRoles}
                                options={roles}/>
                        </Grid>
                        {!values.public &&
                        <>
                          <Grid item xs={12}>
                            <Typography fontSize={18} fontWeight={500} marginTop={1}>
                                Restrictions
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <FormGroup>
                                <FastField name='teamTourney' label='Team tournament' type='checkbox'
                                    as={FormControlLabel} 
                                    control={<Checkbox/>}/>
                                <FastField name='restrictRank' label='Rank restriction' type='checkbox'
                                    as={FormControlLabel} 
                                    control={<Checkbox/>}/>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={9}>
                            <FormGroup>
                                <FastField name='protects' label='Has protects' type='checkbox'
                                    as={FormControlLabel} 
                                    control={<Checkbox/>}/>
                                <FastField name='warmups' label='Has warmups' type='checkbox'
                                    as={FormControlLabel} 
                                    control={<Checkbox/>}/>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={6}>
                            <FastField component={MultiAutocomplete} country
                                name='countries'
                                label='Country restriction'
                                error={errors.countries}
                                options={COUNTRIES}/>
                        </Grid>
                        <Grid item xs={6}/>
                        {values.restrictRank && 
                        <>
                        <Grid item xs={3}>
                            <Field as={TextField} name='minRank' label='Min. player rank' type='number'
                                placeholder='Any'
                                error={errors.minRank !== undefined}
                                helperText={errors.minRank} 
                                fullWidth/>
                        </Grid>
                        <Grid item xs={3}>
                            <Field as={TextField} name='maxRank' label='Max. player rank' type='number'
                                placeholder='Any'
                                error={errors.maxRank !== undefined}
                                helperText={errors.maxRank} 
                                fullWidth/>
                        </Grid>
                        </>}
                        {values.teamTourney && 
                        <>
                        <Grid item xs={3}>
                            <Field as={TextField} name='minTeamSize' label='Min. team size' type='number'
                                error={errors.minTeamSize !== undefined}
                                helperText={errors.minTeamSize} 
                                fullWidth/>
                        </Grid>
                        <Grid item xs={3}>
                            <Field as={TextField} name='maxTeamSize' label='Max. team size' type='number'
                                error={errors.maxTeamSize !== undefined}
                                helperText={errors.maxTeamSize} 
                                fullWidth/>
                        </Grid>
                        </>}
                        </>}
                        <Grid item xs={12}>
                            <Typography fontSize={18} fontWeight={500} marginTop={1}>
                                Deadlines
                            </Typography>
                        </Grid>
                        {values.public && 
                        <Grid item xs={12}>
                            <FormGroup>
                                <FastField name='regOpen' label='Registrations open' type='checkbox'
                                    as={FormControlLabel} 
                                    control={<Checkbox/>}/>
                                <FastField name='applicationOpen' label='Staff applications open' type='checkbox'
                                    as={FormControlLabel} 
                                    control={<Checkbox/>}/>
                            </FormGroup>
                        </Grid>}
                        <Grid item xs={6}>
                            <FastField component={TourneyDateField} 
                                name='regDeadline' 
                                label='Registration deadline'
                                error={errors.regDeadline}/>
                        </Grid>
                        <Grid item xs={6}>
                            <FastField component={TourneyDateField} 
                                name='applicationDeadline' 
                                label='Staff application deadline'
                                error={errors.applicationDeadline}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography fontSize={18} fontWeight={500} marginTop={1}>
                                Links
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <FastField as={TextField} name='forumLink' label='Forum post link' 
                                error={errors.forumLink !== undefined}
                                helperText={errors.forumLink} 
                                fullWidth/>
                        </Grid>
                        <Grid item xs={4}>
                            <FastField as={TextField} name='challongeLink' label='Challonge link' 
                                error={errors.challongeLink !== undefined}
                                helperText={errors.challongeLink} 
                                fullWidth/>
                        </Grid>
                        <Grid item xs={4}>
                            <FastField as={TextField} name='discordLink' label='Discord link' 
                                error={errors.discordLink !== undefined}
                                helperText={errors.discordLink} 
                                fullWidth/>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default TournamentFormView;