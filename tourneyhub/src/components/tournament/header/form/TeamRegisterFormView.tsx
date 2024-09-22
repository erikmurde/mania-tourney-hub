import { Field, FieldArray, Form, Formik } from 'formik';
import { TeamCreateDto } from '../../../../dto/team/TeamCreateDto';
import { Schema } from 'yup';
import { Button, Grid, TextField, Typography } from '@mui/material';
import PlayerAutocomplete from '../../field/PlayerAutocomplete';
import { PersonAdd, PersonRemove } from '@mui/icons-material';
import { Fragment } from 'react';
import { StyledIconButton } from '../../../styled/StyledIconButton';
import { TournamentDto } from '../../../../dto/tournament/TournamentDto';
import TeamTooltip from './TeamTooltip';
import { UserDto } from '../../../../dto/user/UserDto';

interface IProps {
    tourney: TournamentDto,
    initialValues: TeamCreateDto,
    selectValues: UserDto[],
    validationShcema: Schema,
    onSubmit: (values: TeamCreateDto) => void
}

const TeamRegisterFormView = ({tourney, initialValues, selectValues, validationShcema, onSubmit}: IProps) => {

    const getPlayerError = (error: string | string[] | undefined, index: number): string | undefined => {
        if (index > 0) {
            return typeof error === 'string' ? error : error?.[index];
        }
    }

    return (  
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationShcema}
            validateOnChange={false}
            validateOnBlur={false}>
             {({ values, errors }) => {
                const showInfo = tourney.countries.length > 0 || tourney.minPlayerRank > 0 || tourney.maxPlayerRank > 0;
                const canAddPlayer = values.players.length < tourney.maxTeamSize;
    
                return (
                <Form id='team-register-form'>
                    <Grid container rowSpacing={1.5} columnSpacing={1} marginTop={1} alignItems='center'>
                        <Grid item xs={12}>
                            <Typography>General information</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Field fullWidth as={TextField}
                                name='name' 
                                label='Team name *' 
                                error={errors.name !== undefined}
                                helperText={errors.name}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field fullWidth as={TextField} 
                                name='logo' 
                                label='Team logo link' 
                                error={errors.logo !== undefined}
                                helperText={errors.logo}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field fullWidth as={TextField} 
                                name='availability' 
                                label='Availability *' 
                                error={errors.availability !== undefined}
                                helperText={errors.availability}/>
                        </Grid>
                        <FieldArray name='players'>
                        {({ push, remove }) => 
                            <>
                            <Grid item xs={showInfo ? 'auto' : (canAddPlayer ? 6 : 12)}>
                                <Typography>
                                    Team composition
                                </Typography>
                            </Grid>
                            {showInfo && 
                            <Grid item xs={canAddPlayer ? true : 7}>
                                <TeamTooltip tourney={tourney}/>
                            </Grid>}
                            {canAddPlayer &&
                            <Grid item xs={6} textAlign='end'>
                                <Button color='success' startIcon={<PersonAdd/>} onClick={() => push('')}>
                                    Add player
                                </Button>
                            </Grid>}
                            {values.players.map((_, index) => {
                                const error = getPlayerError(errors.players, index);
                                return (
                                <Fragment key={index}>
                                <Grid item xs={6}>
                                    <Field component={PlayerAutocomplete}
                                        name={`players[${index}]`}
                                        label={index > 0 ? `Player ${index + 1}` : 'Captain'}
                                        error={error}
                                        options={selectValues}
                                        disabled={index === 0}/>
                                </Grid>
                                <Grid item xs={6} marginBottom={error ? 2.5 : 0}>
                                    {index > 0 &&
                                    <StyledIconButton color='error' onClick={() => remove(index)}>
                                        <PersonRemove/>
                                    </StyledIconButton>}
                                </Grid>
                                </Fragment>)
                            })}
                            </>
                        }
                        </FieldArray>
                    </Grid>
                </Form>)}}
        </Formik>
    );
}
 
export default TeamRegisterFormView;