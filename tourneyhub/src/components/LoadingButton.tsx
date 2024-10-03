import { Button, ButtonProps, CircularProgress, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface IProps extends ButtonProps {
    loading: boolean,
    children: ReactNode
}

const LoadingButton = ({loading, children, ...btnProps}: IProps) => {
    const theme = useTheme();

    return (  
        <Button variant='contained' {...btnProps}
            sx={{ lineHeight: 0, ...btnProps.sx }}
            disabled={loading || btnProps.disabled} 
            startIcon={loading 
                ? <></> 
                : btnProps.startIcon
            }>
            {loading 
            ? <CircularProgress sx={{ color: theme.palette.text.disabled }} size={25}/>
            : children}
        </Button>
    );
}
 
export default LoadingButton;