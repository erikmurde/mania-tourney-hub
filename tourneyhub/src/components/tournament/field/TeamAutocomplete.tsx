import { FieldInputProps, FormikProps } from 'formik';
import { TeamDtoSimple } from '../../../dto/team/TeamDtoSimple';
import { Autocomplete, TextField, Typography } from '@mui/material';
import Logo from '../Logo';

interface IProps {
    field: FieldInputProps<any>,
    form: FormikProps<any>,
    label: string,
    error: string,
    options: TeamDtoSimple[],
    valueId?: boolean
}

const TeamAutocomplete = ({field, form, label, error, options, valueId}: IProps) => {

    const initialValue = options.find(option => 
        (valueId ? option.id : option.name) === form.values[field.name]
    );

    return (  
        <Autocomplete
            options={options}
            getOptionLabel={option => option.name}
            onChange={(_, value) => form.setFieldValue(
                field.name, 
                valueId ? value?.id : value?.name
            )}
            value={initialValue ?? null}
            renderOption={(props, option) => (
                <li {...props}>
                    <Logo name={option.name} link={option.logo}/>
                    <Typography marginLeft={1}>
                        {option.name}
                    </Typography>
                </li>
            )}
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
 
export default TeamAutocomplete;