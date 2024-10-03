import { Breakpoint, Button, ButtonProps, Dialog, Typography } from '@mui/material';
import { StyledDialogActions } from '../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../styled/styledDialogContent';
import TourneyDialogTitle from './TourneyDialogTitle';
import { StyledIconButton } from '../../styled/StyledIconButton';

interface IProps {
    title: string,
    form: JSX.Element,
    submitBtn: JSX.Element,
    btnProps: ButtonProps,
    btnIcon?: JSX.Element,
    size?: Breakpoint,
    description?: string,

    open: boolean,
    setOpen: (open: boolean) => void
}

const FormDialogBase = ({
    title, btnIcon, btnProps, form, submitBtn, size, description, open, setOpen
    }: IProps) => {

    return (  
        <>
        {btnIcon 
        ?   <StyledIconButton
                onClick={() => {
                    btnProps.onClick ?? setOpen(true);
                }}
                {...btnProps}>
                {btnIcon}
            </StyledIconButton>
        :   <Button variant='contained'
                onClick={() => {
                    btnProps.onClick ?? setOpen(true);
                }}
                {...btnProps}>
                {btnProps.title}
            </Button>}
        {open &&
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth={size ?? 'sm'}>
            <TourneyDialogTitle title={title} onClose={() => setOpen(false)}/>
            <StyledDialogContent>
                <Typography>{description}</Typography>
                {form}
            </StyledDialogContent>
            <StyledDialogActions>
                {submitBtn}
            </StyledDialogActions>
        </Dialog>}
        </>
    );
}

export default FormDialogBase;