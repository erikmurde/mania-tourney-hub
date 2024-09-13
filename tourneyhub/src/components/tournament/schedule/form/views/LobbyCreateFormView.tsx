import { Field, Form, Formik } from 'formik';
import { LobbyDto } from '../../../../../dto/schedule/LobbyDto';
import { Grid } from '@mui/material';
import { Schema } from 'yup';
import { UserDtoSimple } from '../../../../../dto/user/UserDtoSimple';
import PlayerAutocomplete from '../../../field/PlayerAutocomplete';
import TourneyDateTimeField from '../../../field/TourneyDateTimeField';

interface IProps {
    initialValues: LobbyDto,
    selectValues: UserDtoSimple[],
    validationSchema: Schema,
    onSubmit: (values: LobbyDto) => void
}

const LobbyCreateFormView = ({initialValues, selectValues, validationSchema, onSubmit}: IProps) => {
    return (  
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}>
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