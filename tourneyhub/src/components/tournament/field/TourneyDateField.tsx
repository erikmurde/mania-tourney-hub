import { FormControl, FormHelperText } from '@mui/material';
import { FieldInputProps, useFormikContext } from 'formik';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useState } from 'react';

interface IProps {
    label: string,
    error?: string,
    field: FieldInputProps<any>
}

const TourneyDateField = ({label, error, field}: IProps) => {
    const { setFieldValue } = useFormikContext();
    const isInvalid = error !== undefined;

    return (  
        <FormControl fullWidth error={isInvalid}>
            <DatePicker
                disablePast
                label={label}
                {...field}
                value={dayjs(field.value)}
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

export default TourneyDateField;