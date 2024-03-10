import { Edit } from '@mui/icons-material';
import { IconButton, Dialog, Button } from '@mui/material';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { useContext, useState } from 'react';
import { IStageDto } from '../../../../dto/stage/IStageDto';
import StageEditFormView from './views/StageEditFormView';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { UpdateContext } from '../../../../routes/Root';
import { StageService } from '../../../../services/stageService';
import { Schema, object, string, number, date } from 'yup';
import { REQUIRED, STANDARD } from '../../../../constants';

const StageEditForm = ({initialValues}: {initialValues: IStageDto}) => {
    const { stageUpdate, setStageUpdate } = useContext(UpdateContext);
    const [open, setOpen] = useState(false);
    dayjs.extend(utc);

    const onSubmit = async(values: IStageDto) => {
        await new StageService().edit(values.id, values);
        setStageUpdate(stageUpdate + 1);
        setOpen(false);
    }

    const type = initialValues.stageType;
    const validationSchema: Schema = object({
        name: string()
            .required(REQUIRED),
        bestOf: number()
            .required(REQUIRED)
            .min(type === STANDARD ? 1 : 0, 'Must be above 0'),
        lobbySize: number()
            .required(REQUIRED)
            .min(type === STANDARD ? 0 : 1, 'Must be above 0'),
        numAdvancing: number()
            .required(REQUIRED)
            .min(type === STANDARD ? 0 : 1, 'Must be above 0'),
        schedulingDeadline: date()
            .typeError('Invalid date format')
            .required(REQUIRED)
            .min(dayjs.utc(), 'Must be in the future')
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
                        onSubmit={onSubmit}
                    />
                </StyledDialogContent>
                <StyledDialogActions>
                    <Button variant='contained' type='submit' form='stage-edit-form' startIcon={<Edit/>}>
                        Edit
                    </Button>
                </StyledDialogActions>
            </Dialog>}
        </>
    );
}

export default StageEditForm;