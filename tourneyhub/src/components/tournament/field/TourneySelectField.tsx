import { FormControl, FormHelperText, InputLabel, Select } from '@mui/material';
import { Field } from 'formik';

interface IProps {
    name: string,
    label?: string,
    error?: string,
    small?: boolean,
    options: JSX.Element[]
}

const ITEM_HEIGHT = 36;
const ITEM_COUNT = 6;
const PADDING = 8;

const TourneySelectField = ({name, label, error, small, options}: IProps) => {
    const isInvalid = error !== undefined;

    return (  
        <FormControl fullWidth error={isInvalid} size={small ? 'small' : 'medium'}>
            {label && <InputLabel>{label}</InputLabel>}
            <Field
                MenuProps={{ PaperProps: { sx: { maxHeight: ITEM_HEIGHT * ITEM_COUNT + PADDING }}}}
                inputProps={{ sx: { fontSize: small ? 14 : 16 }}}
                as={Select} 
                name={name} 
                label={label}
                defaultValue=''
                >
                {options}
            </Field>
            {isInvalid && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
}

export default TourneySelectField;