import { Grid, TextField } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { IMapDto } from '../../../../../dto/map/IMapDto';

interface IProps {
    initialValues: IMapDto,
    onSubmit: (values: IMapDto) => void
}

const AutoMapEditFormView = ({initialValues, onSubmit}: IProps) => {
    return (  
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            >
            <Form id='auto-update-map-form'>
                <Grid container marginTop={2}>
                    <Grid item xs={12}>
                        <Field as={TextField} name='beatmapId' label='Beatmap ID' type='number' fullWidth/>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    );
}

export default AutoMapEditFormView;