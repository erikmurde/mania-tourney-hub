import { Field, Form, Formik } from 'formik';
import { Grid } from '@mui/material';
import { Schema } from 'yup';
import { UserDtoSimple } from '../../../../../dto/user/UserDtoSimple';
import PlayerAutocomplete from '../../../field/PlayerAutocomplete';
import TourneyDateTimeField from '../../../field/TourneyDateTimeField';
import { LobbyCreateDto } from '../../../../../dto/schedule/lobby/LobbyCreateDto';

interface IProps {
    initialValues: LobbyCreateDto,
    selectValues: UserDtoSimple[],
    validationSchema: Schema,
    onSubmit: (values: LobbyCreateDto) => void
}

const LobbyCreateFormView = ({initialValues, selectValues, validationSchema, onSubmit}: IProps) => {
    return (  
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            enableReinitialize>
            {({ errors }) => (
                <Form id='lobby-create-form'>
                    <Grid container rowSpacing={2} marginTop={1}>
                        <Grid item xs={12}>
                            <Field component={TourneyDateTimeField} 
                                name='time' 
                                label='Lobby time'
                                error={errors.time}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={PlayerAutocomplete}
                                name='referee'
                                label='Referee'
                                error={errors.referee}
                                options={selectValues}/>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default LobbyCreateFormView;