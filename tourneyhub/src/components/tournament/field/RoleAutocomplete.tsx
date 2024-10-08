import { Autocomplete, Chip, TextField } from '@mui/material';
import { FieldInputProps, FormikProps } from 'formik';
import { HOST } from '../../../constants';

interface IProps {
    field: FieldInputProps<any>,
    form: FormikProps<any>,
    label: string,
    error: string,
    options: string[]
}

const RoleAutocomplete = ({field, form, label, error, options}: IProps) => {

    const initialValue = options.filter(option => 
        form.values[field.name].includes(option)
    );

    return (  
        <Autocomplete
            multiple
            size='small'
            disableCloseOnSelect
            limitTags={4}
            options={options}
            value={initialValue ?? []}
            onChange={(_, value) => 
                form.setFieldValue(field.name, value.includes(HOST) ? value : [...value, HOST])
            }
            renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                    <Chip
                        size='small'
                        label={option} 
                        {...getTagProps({ index })}
                        disabled={option === HOST}
                    />
                ))
            }
            renderInput={params => (
                <TextField
                    {...params}
                    error={error !== undefined}
                    helperText={error}
                    label={label}
                    name={field.name}
                />
            )}
        />
    );
}

export default RoleAutocomplete;