import { ContentCopy } from '@mui/icons-material';
import { ClickAwayListener, IconButton, Tooltip, useTheme } from '@mui/material';
import { useState } from 'react';

interface IProps {
    text: string,
    disabled?: boolean
}

const CopyClipboard = ({text, disabled}: IProps) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    return (  
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Tooltip disableHoverListener open={open} title='Copied to clipboard'>
                <IconButton 
                    size='small'
                    disabled={disabled}
                    sx={{ 
                        color: disabled ? theme.palette.text.disabled : theme.palette.primary.main
                    }}
                    onClick={() => {
                        setOpen(true);
                        navigator.clipboard.writeText(text);
                    }}>
                    <ContentCopy/>
                </IconButton>
            </Tooltip>
        </ClickAwayListener>
    );
}
 
export default CopyClipboard;