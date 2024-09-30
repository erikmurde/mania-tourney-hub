import { Breakpoint, Button, ButtonProps, Dialog, Tooltip } from '@mui/material';
import TourneyDialogTitle from './TourneyDialogTitle';
import { StyledDialogActions } from '../../styled/StyledDialogActions';
import { useState } from 'react';
import { StyledDialogContent } from '../../styled/styledDialogContent';
import { StyledIconButton } from '../../styled/StyledIconButton';
import LoadingButton from '../../LoadingButton';

interface IProps {
    title: string,
    actionTitle: string,
    btnProps?: ButtonProps,
    btnIcon?: JSX.Element,
    tooltip?: string,
    description?: string,
    size?: Breakpoint,
    action: () => Promise<void>
}

const ConfirmationDialog = ({btnProps, btnIcon, title, tooltip, description, actionTitle, size, action}: IProps) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onAction = async() => {
        setLoading(true);
        await action();
    }

    const onClose = () => {
        setOpen(false);
        setLoading(false);
    }

    return ( 
        <>
            {btnIcon
                ?   <Tooltip title={tooltip ?? ''}>
                        <StyledIconButton
                            onClick={() => setOpen(true)}
                            {...btnProps}>
                            {btnIcon}
                        </StyledIconButton>
                    </Tooltip>
                :   <Button variant='contained' onClick={() => setOpen(true)} {...btnProps}>
                        {btnProps?.title ?? actionTitle}
                    </Button>}
            {open && 
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth={size ?? 'sm'} fullWidth>
                <TourneyDialogTitle 
                    title={title} 
                    fontSize={18} 
                    onClose={() => setOpen(false)}
                />
                <StyledDialogContent sx={{ marginBottom: 1 }}>
                    {description}
                </StyledDialogContent>
                <StyledDialogActions>
                    <Button variant='contained' color='error' 
                        onClick={() => setOpen(false)} 
                        sx={{ minWidth: 90 }}>
                        Cancel
                    </Button>
                    <LoadingButton loading={loading} variant='contained' color='success'
                        onClick={async() => {
                            await onAction();
                            onClose();
                        }}
                        sx={{ width: 100 }}>
                        {actionTitle}
                    </LoadingButton>
                </StyledDialogActions>
            </Dialog>}
        </>
    );
}

export default ConfirmationDialog;