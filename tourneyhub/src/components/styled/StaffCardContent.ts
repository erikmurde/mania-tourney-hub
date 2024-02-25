import { CardContent, CardContentProps, styled } from '@mui/material';

export const StaffCardContent = styled(CardContent)<CardContentProps>({
    '&.MuiCardContent-root:last-child': {
        padding: 0,
        paddingTop: 5,
        paddingLeft: 10
    }
});