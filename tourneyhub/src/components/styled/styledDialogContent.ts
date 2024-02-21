import { DialogContent, DialogContentProps, styled } from '@mui/material';

export const StyledDialogContent = styled(DialogContent)<DialogContentProps>({
    '&.MuiDialogContent-root': {
        paddingBottom: 0,
    }
});