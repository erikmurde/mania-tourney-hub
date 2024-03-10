import { styled } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';

export const StyledDateTimePicker = styled(DateTimePicker)({
    '&.MuiList-root-MuiMultiSectionDigitalClockSection-root': {
        width: 80
    }
});