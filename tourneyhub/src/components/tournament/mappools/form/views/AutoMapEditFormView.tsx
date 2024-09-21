import { Grid, TextField } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { IMapDto } from '../../../../../dto/map/IMapDto';
import { number, object, Schema } from 'yup';
import { INTEGER, NOT_NEGATIVE, REQUIRED } from '../../../../../constants';

interface IProps {
    initialValues: IMapDto,
    onSubmit: (values: IMapDto) => void,
    isDuplicateId: (id: number, beatmapId: number | null) => boolean
}

const AutoMapEditFormView = ({initialValues, onSubmit, isDuplicateId}: IProps) => {

    const validationSchema: Schema = object({
        beatmapId: number()
        .required(REQUIRED)
        .integer(INTEGER)
        .min(0, NOT_NEGATIVE)
        .test(
            'duplicateId', 
            'Map already in mappool', 
            beatmapId => !isDuplicateId(initialValues.id, beatmapId)
        )
    });

    return (  
        <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnChange={false}
            onSubmit={onSubmit}
            >
            {({ errors }) =>
            <Form id='auto-update-map-form'>
                <Grid container marginTop={2}>
                    <Grid item xs={12}>
                        <Field as={TextField} type='number' name='beatmapId' label='Beatmap ID' fullWidth
                            error={errors.beatmapId !== undefined}
                            helperText={errors.beatmapId}/>
                    </Grid>
                </Grid>
            </Form>}
        </Formik>
    );
}

export default AutoMapEditFormView;