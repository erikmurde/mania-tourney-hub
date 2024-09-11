import { Table, TableBody, TableContainer, TableHead } from '@mui/material';
import { StyledTableRow } from '../../styled/StyledTableRow';
import { SchedTableCell } from '../../styled/SchedTableCell';
import CopyClipboard from './CopyClipboard';

const TimerCommands = () => {
    const rows = [
        ['!mp timer 120', '!mp start 10'],
        ['!mp timer 60', '!mp start 5'],
        ['!mp aborttimer', '!mp abort']
    ];

    return (  
        <TableContainer>
            <Table>
                <TableHead>
                    <StyledTableRow>
                        <SchedTableCell colSpan={2}>Timer commands</SchedTableCell>
                        <SchedTableCell>Start timer</SchedTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => 
                        <StyledTableRow>
                            <SchedTableCell width={100}>
                                {row[0]}
                            </SchedTableCell>
                            <SchedTableCell>
                                <CopyClipboard text={row[0]}/>
                            </SchedTableCell>
                            <SchedTableCell width={100}>
                                {row[1]}
                            </SchedTableCell>
                            <SchedTableCell>
                                <CopyClipboard text={row[1]}/>
                            </SchedTableCell>
                        </StyledTableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
 
export default TimerCommands;