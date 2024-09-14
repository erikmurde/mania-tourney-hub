import { Autocomplete, TextField, Typography } from '@mui/material';
import Flag from '../../Flag';
import { FieldInputProps, FormikProps } from 'formik';
import { UserDtoSimple } from '../../../dto/user/UserDtoSimple';
import { IUserDto } from '../../../dto/user/IUserDto';

type IOption = IUserDto | UserDtoSimple

interface IProps {
    field: FieldInputProps<any>,
    form: FormikProps<any>,
    label: string,
    error: string,
    options: IOption[],
    valueId?: boolean,
    disabled?: boolean
}

const PlayerAutocomplete = ({field, form, label, error, options, valueId, disabled}: IProps) => {

    const initialValue = options.find(option => 
        (valueId ? (option as IUserDto).id : option.name) === field.value
    );

    return (  
        <Autocomplete
            disabled={disabled}
            options={options}
            getOptionLabel={option => option.name}
            onChange={(_, value) => {
                form.setFieldValue(field.name, valueId 
                    ? (value as IUserDto)?.id ?? '' 
                    : (value as UserDtoSimple)?.name ?? '')
            }}
            value={initialValue ?? null}
            renderOption={(props, option) => (
                <li {...props}>
                    <Flag country={option.country}/>
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

export default PlayerAutocomplete;