import { Button, Dialog } from '@mui/material';
import { useState } from 'react';
import SubmittedMapForm from './SubmittedMapCreateForm';
import UnsubmittedMapForm from './UnsubmittedMapCreateForm';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { PlaylistAdd } from '@mui/icons-material';

const MapSelectForm = () => {
    const [open, setOpen] = useState(false);
    const [openSubmitted, setOpenSubmitted] = useState(false);
    const [openUnsubmitted, setOpenUnsubmitted] = useState(false);

    return (
        <>
            <Button variant='contained' startIcon={<PlaylistAdd/>} sx={{ width: 150 }}
                onClick={() => setOpen(true)}>
                Add Map
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='xs'>
                <TourneyDialogTitle title='Add new map' onClose={() => setOpen(false)}/>
                <StyledDialogActions>
                    <Button variant='contained' 
                        onClick={() => {setOpenSubmitted(true); setOpen(false)}}>
                        Submitted
                    </Button>
                    <Button variant='contained' color='secondary' 
                        onClick={() => {setOpenUnsubmitted(true); setOpen(false)}}>
                        Unsubmitted
                    </Button>
                </StyledDialogActions>
            </Dialog>
            <UnsubmittedMapForm open={openUnsubmitted} 
                onClose={() => setOpenUnsubmitted(false)}
            />
            <SubmittedMapForm open={openSubmitted} 
                onClose={() => setOpenSubmitted(false)}
            />
        </>
    );
}

export default MapSelectForm;