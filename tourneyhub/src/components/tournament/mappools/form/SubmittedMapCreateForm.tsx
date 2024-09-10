import { Button, Dialog } from '@mui/material';
import { DialogProps } from '../../../../props/DialogProps';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { Add } from '@mui/icons-material';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { ISubmittedMapDto } from '../../../../dto/map/ISubmittedMapDto';
import SubmittedMapFormView from './views/SubmittedMapFormView';

const SubmittedCreateMapForm = ({open, onClose}: DialogProps) => {

    const onSubmit = (values: ISubmittedMapDto) => {
        console.log('Fetching map', values);
    }

    return (  
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <TourneyDialogTitle title='Add new submitted map' onClose={onClose}/>
            <StyledDialogContent>
                <SubmittedMapFormView 
                    initialValues={{ beatmapId: '' }} 
                    onSubmit={onSubmit}
                />
            </StyledDialogContent>
            <StyledDialogActions>
                <Button variant='contained' type='submit' form='submitted-map-form' startIcon={<Add/>}>
                    Create
                </Button>
            </StyledDialogActions>
        </Dialog>
    );
}

export default SubmittedCreateMapForm;