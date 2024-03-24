import { Autocomplete, TextField, Typography } from '@mui/material';
import Flag from '../../Flag';
import { FieldInputProps, FormikProps } from 'formik';
import { EventParticipantDto } from '../../../dto/user/EventParticipantDto';
import { IUserDto } from '../../../dto/user/IUserDto';
import { ICountryDto } from '../../../dto/ICountryDto';

type IOption = IUserDto | EventParticipantDto | ICountryDto

interface IProps {
    field: FieldInputProps<any>,
    form: FormikProps<any>,
    label: string,
    error: string,
    country?: boolean,
    options: IOption[]
}

const MultiAutocomplete = ({field, form, label, error, country, options}: IProps) => {

    const initialValue = options.filter(option => 
        form.values[field.name].includes(option.name)
    );

    return (  
        <Autocomplete
            multiple
            disableCloseOnSelect
            options={options}
            getOptionLabel={option => option.name}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            value={initialValue ?? []}
            onChange={(_, value) => 
                form.setFieldValue(field.name, value.map(option => option.name))
            }
            renderOption={(props, option) => (
                <li {...props}>
                    <Flag country={country 
                        ? option as ICountryDto 
                        : (option as IUserDto | EventParticipantDto).country}/>
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