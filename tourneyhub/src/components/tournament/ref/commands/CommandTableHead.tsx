import { TableCellProps, TableHead } from '@mui/material';
import { SchedTableCell } from '../../../styled/SchedTableCell';
import { StyledTableRow } from '../../../styled/StyledTableRow';

interface IProps {
    title: string,
    props?: TableCellProps
}

const CommandTableHead = ({title, props}: IProps) => {
    return (
        <TableHead>
            <StyledTableRow>
                <SchedTableCell colSpan={3} {...props}>
                    {title}
                </SchedTableCell>
            </StyledTableRow>
        </TableHead>
    );
}
 
export default CommandTableHead;