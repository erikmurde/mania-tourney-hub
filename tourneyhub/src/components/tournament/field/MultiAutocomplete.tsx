import { Autocomplete, TextField, Typography } from '@mui/material';
import Flag from '../../Flag';
import { FieldInputProps, FormikProps } from 'formik';
import { UserDtoSimple } from '../../../dto/user/UserDtoSimple';
import { UserDto } from '../../../dto/user/UserDto';
import { ICountryDto } from '../../../dto/ICountryDto';

type IOption = UserDto | UserDtoSimple | ICountryDto

interface IProps {
    field: FieldInputProps<any>,
    form: FormikProps<any>,
    label: string,
    error: string,
    options: IOption[],
    country?: boolean,
    valueId?: boolean
}

const MultiAutocomplete = ({field, form, label, error, options, country, valueId}: IProps) => {

    const initialValue = options.filter(option => 
        form.values[field.name].includes(
            valueId ? (option as UserDto | UserDtoSimple).id : option.name
        )
    );

    return (  
        <Autocomplete
            multiple
            disableCloseOnSelect
            options={options}
            getOptionLabel={option => option.name}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            value={initialValue ?? []}
            onChange={(_, value) => form.setFieldValue(
                field.name, 
                value.map(option => valueId ? (option as UserDto | UserDtoSimple).id : option.name)
            )}
            renderOption={(props, option) => (
                <li {...props}>
                    <Flag country={country 
                        ? option as ICountryDto 
                        : (option as UserDto | UserDtoSimple).country}/>
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

export default MultiAutocomplete;