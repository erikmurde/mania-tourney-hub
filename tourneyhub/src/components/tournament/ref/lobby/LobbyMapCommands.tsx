import { TableContainer, Table, TableBody } from '@mui/material';
import { RefSheetPaper } from '../../../styled/RefSheetPaper';
import { StyledTableRow } from '../../../styled/StyledTableRow';
import { RefCommand } from '../../../../domain/RefCommand';
import CommandTableCell from '../commands/CommandTableCell';
import CommandTableHead from '../commands/CommandTableHead';

const LobbyMapCommands = ({selectedId}: {selectedId: number | null}) => {
    
    const mapCommands: RefCommand[] = [
        { name: 'Current map', command: selectedId ? `!mp map ${selectedId} 3` : 'none' },
        { name: 'Map mod', command: '!mp mods Freemod' }
    ];

    return (  
        <RefSheetPaper elevation={8} sx={{ marginBottom: 1 }}>
            <TableContainer>
                <Table>
                    <CommandTableHead title='MAP COMMANDS'/>
                    <TableBody>
                        {mapCommands.map(command => 
                            <StyledTableRow key={command.name}>
                                <CommandTableCell command={command}/>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </RefSheetPaper>
    );
}
 
export default LobbyMapCommands;