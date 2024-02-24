import { Button, ButtonProps, Dialog, IconButton } from '@mui/material';
import TourneyDialogTitle from './TourneyDialogTitle';
import { StyledDialogActions } from '../../styled/StyledDialogActions';
import { useState } from 'react';
import { StyledDialogContent } from '../../styled/styledDialogContent';

interface IProps {
    btnProps?: ButtonProps,
    btnIcon?: JSX.Element,
    title: string,
    description?: string,
    actionTitle: string,
    action: () => void
}

const ConfirmationDialog = ({btnProps, btnIcon, title, description, actionTitle, action}: IProps) => {
    const [open, setOpen] = useState(false);

    return ( 
        <>
            {btnIcon
                ?   <IconButton
                        onClick={() => setOpen(true)}
                        {...btnProps}>
                        {btnIcon}
                    </IconButton>
                :   <Button variant='contained' onClick={() => setOpen(true)} {...btnProps}>
                        {btnProps?.title ?? 'Missing title'}
                    </Button>}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <TourneyDialogTitle 
                    title={title} 
                    fontSize={18} 
                    onClose={() => setOpen(false)}
                />
                <StyledDialogContent>
                    {description}
                </StyledDialogContent>
                <StyledDialogActions>
                    <Button variant='contained' color='error' onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant='contained' color='success' onClick={action}>
                        {actionTitle}
                    </Button>
                </StyledDialogActions>
            </Dialog>
        </>
    );
}

export default ConfirmationDialog;