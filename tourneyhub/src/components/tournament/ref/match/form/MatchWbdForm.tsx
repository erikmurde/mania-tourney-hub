import { Button, Dialog } from '@mui/material';
import { useState } from 'react';
import TourneyDialogTitle from '../../../dialog/TourneyDialogTitle';
import { StyledDialogContent } from '../../../../styled/styledDialogContent';
import { StyledDialogActions } from '../../../../styled/StyledDialogActions';
import { MatchDto } from '../../../../../dto/schedule/MatchDto';
import { MatchWbdDto } from '../../../../../dto/ref/MatchWbdDto';
import { object, Schema, string } from 'yup';
import { REQUIRED } from '../../../../../constants';
import MatchWbdFormView from './MatchWbdFormView';

interface IProps {
    match: MatchDto,
    onWbd: (values: MatchWbdDto) => void
}

const MatchWbdForm = ({match, onWbd}: IProps) => {
    const [open, setOpen] = useState(false);

    const initialValues: MatchWbdDto = {
        match: match,
        winner: ''
    }

    const validationSchema: Schema = object({
        winner: string()
            .required(REQUIRED)
    });

    return (  
        <>
        <Button variant='contained' color='secondary' onClick={() => setOpen(true)}>
            Mark as wbd
        </Button>
        {open &&
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='xs'>
            <TourneyDialogTitle title='Mark match as WBD' onClose={() => setOpen(false)}/>
            <StyledDialogContent>
                <MatchWbdFormView 
                    initialValues={initialValues} 
                    validationSchema={validationSchema} 
                    onSubmit={onWbd}
                />
            </StyledDialogContent>
            <StyledDialogActions>
                <Button variant='contained' type='submit' form='match-wbd-form'>
                    Submit
                </Button>
            </StyledDialogActions>
        </Dialog>}
        </>
    );
}
 
export default MatchWbdForm;