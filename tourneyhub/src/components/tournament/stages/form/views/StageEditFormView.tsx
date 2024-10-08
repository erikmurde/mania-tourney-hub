import { Field, Form, Formik } from 'formik';
import { IStageDto } from '../../../../../dto/stage/IStageDto';
import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import TourneyDateField from '../../../field/TourneyDateField';
import { QUALIFIER, STANDARD } from '../../../../../constants';
import { Schema } from 'yup';

interface IProps {
    initialValues: IStageDto,
    validationSchema: Schema,
    onSubmit: (values: IStageDto) => void
}

const StageEditFormView = ({initialValues, validationSchema, onSubmit}: IProps) => {
    const type = initialValues.stageType.name;

    return (  
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}>
            {({ errors }) => (
                <Form id='stage-edit-form'>
                    <Grid container rowSpacing={2} columnSpacing={1.5} marginTop={0}>
                        <Grid item xs={12}>
                            <Field fullWidth as={TextField}
                                size='small'
                                name='name' 
                                label='Name' 
                                error={errors.name !== undefined} 
                                helperText={errors.name}/> 
                        </Grid>
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
                                size='small'
                                name='lobbySize' 
                                label='Lobby size'
                                type='number'
                                error={errors.lobbySize !== undefined}
                                helperText={errors.lobbySize}/>
                        </Grid>
                        <Grid item xs>
                            <Field fullWidth as={TextField}
                                size='small'
                                name='numAdvancing' 
                                label='Advancing players' 
                                type='number'
                                error={errors.numAdvancing !== undefined}
                                helperText={errors.numAdvancing}/>
                        </Grid>
                        </>}
                        {type === STANDARD && 
                        <Grid item xs={6}>
                            <Field fullWidth as={TextField}
                                size='small'
                                name='bestOf' 
                                label='Best of' 
                                type='number'
                                error={errors.bestOf !== undefined}
                                helperText={errors.bestOf}/>
                        </Grid>}
                    </Grid>
                    <Grid container marginTop={1}>
                        <Grid item xs={12}>
                            <Field name='mappoolPublished' label='Publish mappool' type='checkbox'
                            as={FormControlLabel} 
                            control={<Checkbox size='small'/>}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field name='schedulePublished' label='Publish schedule' type='checkbox'
                            as={FormControlLabel} 
                            control={<Checkbox size='small'/>}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field name='statsPublished' label='Publish statistics' type='checkbox'
                            as={FormControlLabel} 
                            control={<Checkbox size='small'/>}/>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default StageEditFormView;