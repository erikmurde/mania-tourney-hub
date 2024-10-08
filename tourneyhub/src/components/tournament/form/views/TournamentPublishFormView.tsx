import { Schema } from 'yup';
import { FastField, Form, Formik } from 'formik';
import { Grid, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import TourneyDateField from '../../field/TourneyDateField';
import { TournamentPublishDto } from '../../../../dto/tournament/TournamentPublishDto';

interface IProps {
    initialValues: TournamentPublishDto,
    validationSchema: Schema,
    onSubmit: (values: TournamentPublishDto) => void
}

const TournamentPublishFormView = ({initialValues, validationSchema, onSubmit}: IProps) => {
    return (  
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}>
            {({ errors }) => (
                <Form id='tourney-publish-form'>
                    <Grid container rowSpacing={2} columnSpacing={1} marginTop={0.5}>
                        <Grid item>
                            <FormGroup>
                                <FastField name='regsOpen' label='Open player registrations' type='checkbox'
                                    as={FormControlLabel} 
                                    control={<Checkbox size='small'/>}/>
                                <FastField name='applicationsOpen' label='Open staff applications' type='checkbox'
                                    as={FormControlLabel} 
                                    control={<Checkbox size='small'/>}/>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={8}>
                            <FastField component={TourneyDateField} 
                                name='regDeadline' 
                                label='Registration deadline'
                                error={errors.regDeadline}/>
                        </Grid>
                        <Grid item xs={8}>
                            <FastField component={TourneyDateField} 
                                name='applicationDeadline' 
                                label='Staff application deadline'
                                error={errors.applicationDeadline}/>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default TournamentPublishFormView;