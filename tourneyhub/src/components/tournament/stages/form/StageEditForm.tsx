import { Edit } from '@mui/icons-material';
import { IconButton, Dialog, Button } from '@mui/material';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { useState } from 'react';
import { IStageDto } from '../../../../dto/stage/IStageDto';
import StageEditFormView from './views/StageEditFormView';
import dayjs from 'dayjs';

const StageEditForm = ({initialValues}: {initialValues: IStageDto}) => {
    const [open, setOpen] = useState(false);

    const onSubmit = (values: IStageDto) => {
        console.log('editing: ', values);
        setOpen(false);
    }

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
                        initialValues={{...initialValues, schedulingDeadline: dayjs(initialValues.schedulingDeadline)}} 
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