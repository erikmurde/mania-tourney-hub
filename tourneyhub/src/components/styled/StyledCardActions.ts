import { CardActions, CardActionsProps, styled } from '@mui/material';

export const StyledCardActions = styled(CardActions)<CardActionsProps>({
    '&.MuiCardActions-root': {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16
    }
});