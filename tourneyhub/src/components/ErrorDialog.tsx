import { Button, Dialog, DialogContent, DialogTitle, Divider, Typography } from '@mui/material';
import { StyledDialogActions } from './styled/StyledDialogActions';
import { ApiErrorResponse } from '../dto/ApiErrorResponse';
import { Error } from '@mui/icons-material';

interface IProps {
    error: ApiErrorResponse,
    setError: (error: ApiErrorResponse | null) => void
}

const ErrorDialog = ({error, setError}: IProps) => {

    const onClose = () => setError(null);

    return (
        <Dialog open={error !== null} onClose={onClose} maxWidth='sm' fullWidth>
            <DialogTitle textAlign='center'>
                <Typography marginBottom={1}>
                    <Error color='error' sx={{ fontSize: 80 }}/>
                </Typography>
                <Typography fontSize={24}>
                    Oops! Something went wrong.
                </Typography>
                <Divider sx={{ marginTop: 1 }}/>
            </DialogTitle>
            <DialogContent sx={{ textAlign: 'center' }}>
                {error.message}
            </DialogContent>
            <StyledDialogActions sx={{ justifyContent: 'center' }}>
                <Button variant='contained' onClick={onClose} sx={{ width: 100 }}>
                    Close
                </Button>
            </StyledDialogActions>
        </Dialog>
    );
}
 
export default ErrorDialog;