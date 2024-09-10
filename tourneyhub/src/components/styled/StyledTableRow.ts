import { styled, TableRow } from '@mui/material';

export const StyledTableRow = styled(TableRow)({
    '&:last-child td, &:last-child th': { 
        border: 0 
    }, 
    height: 50 
});