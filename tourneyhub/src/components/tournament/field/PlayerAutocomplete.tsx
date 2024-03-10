import { Autocomplete, TextField, Typography } from '@mui/material';
import Flag from '../../Flag';
import { FieldInputProps, FormikProps } from 'formik';
import { EventParticipantDto } from '../../../dto/user/EventParticipantDto';
import { IUserDto } from '../../../dto/user/IUserDto';

type IOption = IUserDto | EventParticipantDto

interface IProps {
    field: FieldInputProps<any>,
    form: FormikProps<any>,
    label: string,
    error: string,
    options: IOption[],
    valueId?: boolean
}

const PlayerAutocomplete = ({field, form, label, error, options, valueId}: IProps) => {

    const initialValue = options.find(option => 
        (valueId ? (option as IUserDto).id : option.name) === form.values[field.name]
    );

    return (  
        <Autocomplete
            options={options}
            getOptionLabel={option => option.name}
            onChange={(_, value) => {
                form.setFieldValue(field.name, valueId 
                    ? (value as IUserDto)?.id ?? '' 
                    : (value as EventParticipantDto)?.name ?? '')
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