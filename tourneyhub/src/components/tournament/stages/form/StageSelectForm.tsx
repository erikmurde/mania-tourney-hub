import { NoteAdd } from '@mui/icons-material';
import { Grid, Button, Dialog, Tooltip } from '@mui/material';
import { useState } from 'react';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import StageCreateForm from './StageCreateForm';
import { QUALIFIER, STANDARD } from '../../../../constants';

const StageSelectForm = ({hasQualifier}: {hasQualifier: boolean}) => {
    const [open, setOpen] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [stageType, setStageType] = useState('');

    const chooseType = (type: string) => {
        setStageType(type);
        setOpenCreate(true);
        setOpen(false);
    }

    return (  
        <Grid item>
            <Button sx={{ width: 150 }} variant='contained' startIcon={<NoteAdd/>} 
                onClick={() => setOpen(true)}>
                New stage
            </Button>
            {open &&
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='sm'>
                <TourneyDialogTitle title='Add new stage' onClose={() => setOpen(false)}/>
                <StyledDialogContent/>
                <StyledDialogActions>
                    <Button variant='contained' onClick={() => chooseType(STANDARD)}>
                        Standard
                    </Button>
                    <Tooltip title={hasQualifier ? 'A qualifier stage already exists' : ''}>
                        <span>
                            <Button variant='contained' color='secondary'
                                disabled={hasQualifier} 
                                onClick={() => chooseType(QUALIFIER)}>
                                Qualifier
                            </Button>
                        </span>
                    </Tooltip>
                </StyledDialogActions>
            </Dialog>}
            {openCreate && 
            <StageCreateForm 
                type={stageType}
                open={openCreate} 
                onClose={() => setOpenCreate(false)}/>}
        </Grid>
    );
}

export default StageSelectForm;