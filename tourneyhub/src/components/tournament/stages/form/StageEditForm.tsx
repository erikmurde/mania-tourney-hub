import { Edit } from '@mui/icons-material';
import { IconButton, Dialog } from '@mui/material';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { useContext, useState } from 'react';
import { IStageDto } from '../../../../dto/stage/IStageDto';
import StageEditFormView from './views/StageEditFormView';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ErrorContext, UpdateContext } from '../../../../routes/Root';
import { StageService } from '../../../../services/stageService';
import { Schema, object, string, number, date } from 'yup';
import { FUTURE_DATE, INVALID_DATE, QUALIFIER, REQUIRED, STANDARD } from '../../../../constants';
import LoadingButton from '../../../LoadingButton';
import { POSITIVE } from '../../../../domain/validation/unsubmittedMapSchema';

const StageEditForm = ({initialValues}: {initialValues: IStageDto}) => {
    const { stageUpdate, setStageUpdate } = useContext(UpdateContext);
    const { setError } = useContext(ErrorContext);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    dayjs.extend(utc);

    const onSubmit = async(values: IStageDto) => {
        const error = await new StageService().edit(values.id, values);

        if (error) {
            return setError(error);
        }
        setStageUpdate(stageUpdate + 1);
        setOpen(false);
    }

    const type = initialValues.stageType.name;
    
    const validationSchema: Schema = object({
        name: string()
            .required(REQUIRED),
        bestOf: number()
            .required(REQUIRED)
            .min(type === STANDARD ? 3 : 0, 'Must be 3 or higher'),
        lobbySize: number()
            .required(REQUIRED)
            .min(type === STANDARD ? 0 : 1, POSITIVE),
        numAdvancing: number()
            .required(REQUIRED)
            .min(type === STANDARD ? 0 : 1, POSITIVE),
        schedulingDeadline: date()
            .when(([], schema) => {
                if (type === QUALIFIER) {
                    return schema
                        .typeError(INVALID_DATE)
                        .required(REQUIRED)
                        .min(dayjs.utc(), FUTURE_DATE);
                }
                return schema.notRequired()
            }),
    });

    return (  
        <>
            <IconButton color='primary' onClick={() => setOpen(true)}>
                <Edit/>
            </IconButton>
            {open && 
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='xs'>
                <TourneyDialogTitle title='Edit stage' onClose={() => setOpen(false)}/>
                <StyledDialogContent>
                    <StageEditFormView
                        initialValues={{...initialValues, schedulingDeadline: dayjs.utc(initialValues.schedulingDeadline)}}
                        validationSchema={validationSchema}
                        onSubmit={async(values) => {
                            setLoading(true);
                            await onSubmit(values);
                            setLoading(false);
                        }}
                    />
                </StyledDialogContent>
                <StyledDialogActions>
                    <LoadingButton loading={loading} type='submit' form='stage-edit-form' 
                        startIcon={<Edit/>}
                        sx={{ width: 100 }}>
                        Edit
                    </LoadingButton>
                </StyledDialogActions>
            </Dialog>}
        </>
    );
}

export default StageEditForm;