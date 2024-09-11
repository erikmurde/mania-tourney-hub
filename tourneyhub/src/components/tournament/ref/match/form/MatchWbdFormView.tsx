import { Grid, MenuItem } from '@mui/material';
import { Form, Formik } from 'formik';
import TourneySelectField from '../../../field/TourneySelectField';
import { MatchWbdDto } from '../../../../../dto/ref/MatchWbdDto';
import { Schema } from 'yup';

interface IProps {
    initialValues: MatchWbdDto,
    validationSchema: Schema,
    onSubmit: (values: MatchWbdDto) => void
}

const MatchWbdFormView = ({initialValues, validationSchema, onSubmit}: IProps) => {
    const players = [
        initialValues.match.player1.name, 
        initialValues.match.player2.name
    ];
    
    return (  
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            >
            {({ errors }) => (
            <Form id='match-wbd-form'>
                <Grid container direction='column' marginTop={1}>
                    <Grid item>
                        <TourneySelectField name='winner' label='Winner of match' error={errors.winner}
                            options={players.map((name, index) => 
                                <MenuItem key={index} value={name}>
                                    {name}
                                </MenuItem>
                            )}/>
                    </Grid>
                </Grid>
            </Form>
            )}
        </Formik>
    );
}
 
export default MatchWbdFormView;