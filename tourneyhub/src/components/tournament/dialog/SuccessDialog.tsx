import { Dialog, DialogTitle, Button } from '@mui/material';
import { StyledDialogActions } from '../../styled/StyledDialogActions';

interface IProps {
    title: string,
    open: boolean,
    setOpen: (open: boolean) => void,
    onClose?: () => void
}

const SuccessDialog = ({title, open, setOpen, onClose}: IProps) => {

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
        setOpen(false);
    }

    return (  
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <StyledDialogActions>
                <Button variant='contained' onClick={handleClose}>
                    Close
                </Button>
            </StyledDialogActions>
        </Dialog>
    );
}

export default SuccessDialog;