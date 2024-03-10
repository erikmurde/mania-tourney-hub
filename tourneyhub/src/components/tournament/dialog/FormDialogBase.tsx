import { Breakpoint, Button, ButtonProps, Dialog, Divider } from '@mui/material';
import { StyledDialogActions } from '../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../styled/styledDialogContent';
import TourneyDialogTitle from './TourneyDialogTitle';
import { StyledIconButton } from '../../styled/StyledIconButton';

interface IProps {
    title: string,
    formName: string,
    form: JSX.Element,
    btnProps: ButtonProps,
    btnIcon?: JSX.Element,
    submitActionName: string,
    size?: Breakpoint,

    open: boolean,
    setOpen: (open: boolean) => void
}

const FormDialogBase = ({title, formName, btnIcon, submitActionName, btnProps, form, size, open, setOpen}: IProps) => {
    return (  
        <>
        {btnIcon &&
        <StyledIconButton
            onClick={() => {
                btnProps.onClick ?? setOpen(true);
            }}
            {...btnProps}>
            {btnIcon}
        </StyledIconButton>}
        {!btnIcon && 
        <Button variant='contained'
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
                {form}
            </StyledDialogContent>
            <StyledDialogActions>
                <Button variant='contained' type='submit' form={formName}>
                    {submitActionName}
                </Button>
            </StyledDialogActions>
        </Dialog>}
        </>
    );
}

export default FormDialogBase;