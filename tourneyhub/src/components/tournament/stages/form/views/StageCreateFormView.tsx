import { Field, Form, Formik } from 'formik';
import { IStageDto } from '../../../../../dto/stage/IStageDto';
import { Grid, TextField } from '@mui/material';
import TourneyDateField from '../../../field/TourneyDateField';
import { Schema } from 'yup';
import { QUALIFIER, STANDARD } from '../../../../../constants';

interface IProps {
    initialValues: IStageDto,
    validationSchema: Schema,
    onSubmit: (values: IStageDto) => void
}

const StageCreateFormView = ({initialValues, validationSchema, onSubmit}: IProps) => {
    const type = initialValues.stageType;

    return (  
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}>
            {({ errors }) => (
                <Form id='stage-create-form'>
                    <Grid container rowSpacing={2} columnSpacing={1} marginTop={0.5}>
                        <Grid item xs={12}>
                            <Field fullWidth as={TextField} 
                                name='name' 
                                label='Name' 
                                error={errors.name !== undefined} 
                                helperText={errors.name}/> 
                        </Grid>
                        {type === STANDARD && 
                        <Grid item>
                            <Field fullWidth as={TextField} 
                                name='bestOf' 
                                label='Best of' 
                                type='number'
                                error={errors.bestOf !== undefined}
                                helperText={errors.bestOf}/>
                        </Grid>}
                        {type === QUALIFIER &&
                        <>
                        <Grid item xs={12}>
                            <Field component={TourneyDateField} 
                                name='schedulingDeadline' 
                                label='Scheduling deadline'
                                error={errors.schedulingDeadline}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Field fullWidth as={TextField} 
                                name='lobbySize' 
                                label='Lobby size'
                                type='number'
                                error={errors.lobbySize !== undefined}
                                helperText={errors.lobbySize}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Field fullWidth as={TextField} 
                                name='numAdvancing' 
                                label='Advancing players' 
                                type='number'
                                error={errors.numAdvancing !== undefined}
                                helperText={errors.numAdvancing}/>
                        </Grid>
                        </>}
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default StageCreateFormView;