import { Table, TableBody, TableContainer } from '@mui/material';
import { RefSheetPaper } from '../../../styled/RefSheetPaper';
import TimerCommands from '../TimerCommands';
import { RefCommand } from '../../../../domain/RefCommand';
import { StyledTableRow } from '../../../styled/StyledTableRow';
import CommandTableCell from '../CommandTableCell';
import RefTableHead from '../CommandTableHead';

const QualiGeneralCommands = ({lobbySize}: {lobbySize: number}) => {
    const generalCommands: RefCommand[] = [
        { name: 'Settings', command: '!mp settings' },
        { name: 'Room setup', command: `!mp set 0 3 ${lobbySize}` },
        { name: 'Close room', command: '!mp close' }
    ];

    return (  
        <RefSheetPaper elevation={8}>
            <TableContainer>
                <Table>
                    <RefTableHead title='GENERAL COMMANDS'/>
                    <TableBody>
                        {generalCommands.map((command) => 
                            <StyledTableRow key={command.name}>
                                <CommandTableCell command={command}/>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TimerCommands/>
        </RefSheetPaper>
    );
}
 
export default QualiGeneralCommands;