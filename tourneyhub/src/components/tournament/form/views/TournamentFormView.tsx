import { Schema } from 'yup';
import { FastField, Field, Form, Formik } from 'formik';
import { Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@mui/material';
import { TournamentEdit } from '../../../../domain/TournamentEdit';
import MultiAutocomplete from '../../field/MultiAutocomplete';
import RoleAutocomplete from '../../field/RoleAutocomplete';
import TourneyDateField from '../../field/TourneyDateField';
import TourneyLinks from './TourneyLinks';
import { ICountryDto } from '../../../../dto/ICountryDto';
import { useEffect, useState } from 'react';
import { RoleService } from '../../../../services/roleService';
import { CountryService } from '../../../../services/countryService';
import { PLAYER } from '../../../../constants';

interface IProps {
    initialValues: TournamentEdit,
    validationSchema: Schema,
    onSubmit: (values: TournamentEdit) => void
}

const TournamentFormView = ({initialValues, validationSchema, onSubmit}: IProps) => {
    const [roles, setRoles] = useState([] as string[]);
    const [countries, setCountries] = useState([] as ICountryDto[]);

    useEffect(() => {
        new RoleService()
            .getAll()
            .then(roles => setRoles(
                roles.map(role => role.name).filter(role => role !== PLAYER)
            ));

        if (!initialValues.published) {
            new CountryService()
                .getAll()
                .then(countries => setCountries(countries));
        }
    }, [initialValues.published]);

    return (  
        <Formik
            initialValues={initialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}>
            {({ errors, values }) => (
                <Form id='tourney-form'>
                    <Grid container rowSpacing={2} columnSpacing={1.5} marginTop={0}>
                        <Grid item xs={12}>
                            <Typography fontSize={18} fontWeight={500}>
                                General information
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <FastField as={TextField} name='name' label='Name' size='small'
                                error={errors.name !== undefined}
                                helperText={errors.name} 
                                fullWidth/>
                        </Grid>
                        <Grid item xs={3}>
                            <FastField as={TextField} name='code' label='Code' size='small' 
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
                        {!values.published &&
                        <Grid item xs={2}>
                            <FastField as={TextField} name='keyCount' label='Keycount' type='number' size='small'
                                error={errors.keyCount !== undefined}
                                helperText={errors.keyCount} 
                                fullWidth/>
                        </Grid>}
                        <Grid item xs={values.published ? 8 : 6}>
                            <FastField as={TextField} name='banner' label='Banner image link' size='small'
                                error={errors.banner !== undefined}
                                helperText={errors.banner} 
                                fullWidth/>
                        </Grid>
                        <Grid item xs={8}>
                            <FastField as={TextField} name='regMessage' label='Registration message' size='small'
                                error={errors.regMessage !== undefined}
                                helperText={errors.regMessage} 
                                fullWidth/>
                        </Grid>
                        {roles.length > 0 &&
                        <Grid item xs={8}>
                            <FastField component={RoleAutocomplete} name='hostRoles' label='Your roles'
                                valueId
                                error={errors.hostRoles}
                                options={roles}/>
                        </Grid>}
                        {!values.published &&
                        <>
                          <Grid item xs={12}>
                            <Typography fontSize={18} fontWeight={500} marginTop={1}>
                                Restrictions
                            </Typography>
                        </Grid>
                        <Grid item>
                            <FormGroup>
                                <FastField name='teamTourney' label='Team tournament' type='checkbox'
                                    as={FormControlLabel} 
                                    control={<Checkbox size='small'/>}/>
                                <FastField name='restrictRank' label='Rank restriction' type='checkbox'
                                    as={FormControlLabel} 
                                    control={<Checkbox size='small'/>}/>
                            </FormGroup>
                        </Grid>
                        <Grid item>
                            <FormGroup>
                                <FastField name='protects' label='Has protects' type='checkbox'
                                    as={FormControlLabel} 
                                    control={<Checkbox size='small'/>}/>
                                <FastField name='warmups' label='Has warmups' type='checkbox'
                                    as={FormControlLabel} 
                                    control={<Checkbox size='small'/>}/>
                            </FormGroup>
                        </Grid>
                        <Grid item xs/>
                        {countries.length > 0 &&
                        <Grid item xs={8}>
                            <FastField component={MultiAutocomplete} country
                                name='countries'
                                label='Country restriction'
                                error={errors.countries}
                                options={countries}/>
                        </Grid>}
                        <Grid item xs={4}/>
                        {values.restrictRank && 
                        <>
                        <Grid item xs={3}>
                            <Field as={TextField} name='minPlayerRank' label='Min. player rank' type='number' size='small'
                                placeholder='Any'
                                error={errors.minPlayerRank !== undefined}
                                helperText={errors.minPlayerRank} 
                                fullWidth/>
                        </Grid>
                        <Grid item xs={3}>
                            <Field as={TextField} name='maxPlayerRank' label='Max. player rank' type='number' size='small'
                                placeholder='Any'
                                error={errors.maxPlayerRank !== undefined}
                                helperText={errors.maxPlayerRank} 
                                fullWidth/>
                        </Grid>
                        </>}
                        {values.teamTourney && 
                        <>
                        <Grid item xs={3}>
                            <Field as={TextField} name='minTeamSize' label='Min. team size' type='number' size='small'
                                error={errors.minTeamSize !== undefined}
                                helperText={errors.minTeamSize} 
                                fullWidth/>
                        </Grid>
                        <Grid item xs={3}>
                            <Field as={TextField} name='maxTeamSize' label='Max. team size' type='number' size='small'
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
                        {values.published && 
                        <Grid item>
                            <FormGroup>
                                <FastField name='regsOpen' label='Registrations open' type='checkbox'
                                    as={FormControlLabel} 
                                    control={<Checkbox size='small'/>}/>
                                <FastField name='applicationsOpen' label='Staff applications open' type='checkbox'
                                    as={FormControlLabel} 
                                    control={<Checkbox size='small'/>}/>
                            </FormGroup>
                        </Grid>}
                        {values.published && <Grid item xs={8}/>}
                        <Grid item xs={6}>
                            <FastField component={TourneyDateField} 
                                name='regDeadline' 
                                label='Registration deadline'
                                error={errors.regDeadline}/>
                        </Grid>
                        <Grid item xs={6} marginBottom={1}>
                            <FastField component={TourneyDateField} 
                                name='applicationDeadline' 
                                label='Staff application deadline'
                                error={errors.applicationDeadline}/>
                        </Grid>
                        <TourneyLinks links={values.links} errors={errors}/>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default TournamentFormView;