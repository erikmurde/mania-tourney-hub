import { CardContent, CardContentProps, styled } from '@mui/material';

export const StyledCardContent = styled(CardContent)<CardContentProps>({
    '&.MuiCardContent-root:last-child': {
        paddingBottom: 16
    }
});