import { FormControl, FormHelperText } from '@mui/material';
import dayjs from 'dayjs';
import { FieldInputProps, useFormikContext } from 'formik';
import { StyledDateTimePicker } from '../../styled/StyledDateTimePicker';

interface IProps {
    label: string,
    error?: string,
    field: FieldInputProps<any>
}

const TourneyDateTimeField = ({label, error, field}: IProps) => {
    const { setFieldValue } = useFormikContext();
    const isInvalid = error !== undefined;

    return (  
        <FormControl fullWidth error={isInvalid}>
            <StyledDateTimePicker
                disablePast
                ampm={false}
                label={label}
                {...field}
                value={dayjs.utc(field.value)}
                onChange={(value) => setFieldValue(field.name, value)}
                slotProps={{
                    textField: {
                        error: isInvalid
                    }
                }}/>
            {isInvalid && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
}

export default TourneyDateTimeField;