import { Field, FieldArray, Form, Formik } from 'formik';
import { TeamCreateDto } from '../../../../dto/team/TeamCreateDto';
import { UserDto } from '../../../../dto/user/UserDto';
import { Schema } from 'yup';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import PlayerAutocomplete from '../../field/PlayerAutocomplete';
import { PersonAdd, PersonRemove } from '@mui/icons-material';

interface IProps {
    maxTeamSize: number,
    initialValues: TeamCreateDto,
    selectValues: UserDto[],
    validationShcema: Schema,
    onSubmit: (values: TeamCreateDto) => void
}

const TeamRegisterFormView = ({maxTeamSize, initialValues, selectValues, validationShcema, onSubmit}: IProps) => {

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
             {({ values, errors }) => (
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
                            <Grid item xs={values.players.length < maxTeamSize ? 6 : 12}>
                                <Typography>Team composition</Typography>
                            </Grid>
                            {values.players.length < maxTeamSize &&
                            <Grid item xs={6} textAlign='end'>
                                <Button color='success' startIcon={<PersonAdd/>} onClick={() => push('')}>
                                    Add player
                                </Button>
                            </Grid>}
                            {values.players.map((_, index) => 
                                <>
                                <Grid item xs={6}>
                                    <Field component={PlayerAutocomplete}
                                        name={`players[${index}]`}
                                        label={index > 0 ? `Player ${index + 1}` : 'Captain'}
                                        error={getPlayerError(errors.players, index)}
                                        options={selectValues}
                                        disabled={index === 0}/>
                                </Grid>
                                <Grid item xs={6}>
                                    {index > 0 &&
                                    <IconButton color='error' onClick={() => remove(index)}>
                                        <PersonRemove/>
                                    </IconButton>}
                                </Grid>
                                </>)}
                            </>
                        }
                        </FieldArray>
                    </Grid>
                </Form>)}
        </Formik>
    );
}
 
export default TeamRegisterFormView;