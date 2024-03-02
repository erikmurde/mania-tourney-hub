import { IconButton, IconButtonProps, styled } from '@mui/material';

export const StyledIconButton = styled(IconButton)<IconButtonProps>({
    '&.MuiButtonBase-root': {
        height: 30,
    }
});