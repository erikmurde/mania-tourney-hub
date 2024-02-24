import { Field, Form, Formik } from 'formik';
import { IStageDto } from '../../../../../dto/stage/IStageDto';
import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import TourneyDateField from '../../../field/TourneyDateField';

interface IProps {
    initialValues: IStageDto,
    onSubmit: (values: IStageDto) => void
}

const StageEditFormView = ({initialValues, onSubmit}: IProps) => {
    const type = initialValues.stageTypeId;

    return (  
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            >
            <Form id='stage-edit-form'>
                <Grid container rowSpacing={2} columnSpacing={1} marginTop={1}>
                    <Grid item xs={12}>
                        <Field as={TextField} name='name' label='Name' fullWidth/>
                    </Grid>
                    {type === '1' &&
                    <>
                    <Grid item xs={12}>
                        <Field component={TourneyDateField} name='schedulingDeadline' label='Scheduling deadline'/>
                    </Grid>
                    <Grid item xs={6}>
                        <Field as={TextField} name='lobbySize' label='Lobby size' type='number' fullWidth/>
                    </Grid>
                    <Grid item xs>
                        <Field as={TextField} name='numAdvancing' label='Advancing players' type='number' fullWidth/>
                    </Grid>
                    </>}
                    {type === '0' && 
                    <Grid item xs={6}>
                        <Field as={TextField} name='bestOf' label='Best of' type='number' fullWidth/>
                    </Grid>}
                </Grid>
                <Grid container marginTop={1}>
                    <Grid item xs={12}>
                        <Field name='mappoolPublic' label='Publish mappool' type='checkbox'
                        as={FormControlLabel} 
                        control={<Checkbox/>}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field name='schedulePublic' label='Publish schedule' type='checkbox'
                        as={FormControlLabel} 
                        control={<Checkbox/>}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field name='statisticsPublic' label='Publish statistics' type='checkbox'
                        as={FormControlLabel} 
                        control={<Checkbox/>}/>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    );
}

export default StageEditFormView;