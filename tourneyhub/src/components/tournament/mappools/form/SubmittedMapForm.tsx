import { Button, Dialog } from '@mui/material';
import { DialogProps } from '../../../../props/DialogProps';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { Add } from '@mui/icons-material';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';

const SubmittedMapForm = ({open, onClose}: DialogProps) => {
    return (  
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <TourneyDialogTitle title='Add new submitted map' onClose={onClose}/>
            <StyledDialogContent>
            </StyledDialogContent>
            <StyledDialogActions>
                <Button variant='contained' type='submit' startIcon={<Add/>}>
                    Create
                </Button>
            </StyledDialogActions>
        </Dialog>
    );
}

export default SubmittedMapForm;