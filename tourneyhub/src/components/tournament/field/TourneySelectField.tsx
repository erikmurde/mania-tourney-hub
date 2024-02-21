import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Field } from 'formik';

interface IProps {
    name: string,
    label: string,
    error?: string,
    options: JSX.Element[]
}

const TourneySelectField = ({name, label, error, options}: IProps) => {
    return (  
        <FormControl fullWidth error={error !== undefined}>
            <InputLabel>{label}</InputLabel>
            <Field as={Select} name={name} label={label} defaultValue=''>
                {options}
            </Field>
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    );
}

export default TourneySelectField;