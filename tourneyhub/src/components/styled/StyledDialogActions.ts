import { DialogActions, DialogActionsProps, styled } from '@mui/material';

export const StyledDialogActions = styled(DialogActions)<DialogActionsProps>({
    '&.MuiDialogActions-root': {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 24,
        paddingRight: 24
    }
});