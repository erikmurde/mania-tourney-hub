import { Grid, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { ISubmittedMapDto } from '../../../../../dto/map/ISubmittedMapDto';

interface IProps {
    initialValues: ISubmittedMapDto,
    onSubmit: (values: ISubmittedMapDto) => void
}

const SubmittedMapFormView = ({initialValues, onSubmit}: IProps) => {
    return (  
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            >
            <Form id='submitted-map-form'>
                <Grid container marginTop={2}>
                    <Grid item xs={12}>
                        <Field as={TextField} name='beatmapId' label='Beatmap ID' type='number' fullWidth/>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    );
}
 
export default SubmittedMapFormView;