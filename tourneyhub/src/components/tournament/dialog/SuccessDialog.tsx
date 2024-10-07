import { Dialog, DialogTitle, Button, Typography, Divider } from '@mui/material';
import { StyledDialogActions } from '../../styled/StyledDialogActions';
import { Check } from '@mui/icons-material';

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
        <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
            <DialogTitle sx={{ paddingBottom: 0 }} textAlign='center'>
                <Typography marginBottom={1}>
                    <Check color='success' sx={{ fontSize: 80 }}/>
                </Typography>
                {title}
                <Divider sx={{ marginTop: 1 }}/>
            </DialogTitle>
            <StyledDialogActions sx={{ justifyContent: 'center' }}>
                <Button variant='contained' onClick={handleClose}>
                    Close
                </Button>
            </StyledDialogActions>
        </Dialog>
    );
}

export default SuccessDialog;