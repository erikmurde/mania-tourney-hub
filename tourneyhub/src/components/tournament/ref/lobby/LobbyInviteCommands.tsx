import { Table, TableBody, TableContainer } from '@mui/material';
import { RefSheetPaper } from '../../../styled/RefSheetPaper';
import { StyledTableRow } from '../../../styled/StyledTableRow';
import CommandTableCell from '../commands/CommandTableCell';
import CommandTableHead from '../commands/CommandTableHead';

const COL_COUNT = 3;

const LobbyInviteCommands = ({players}: {players: string[]}) => {

    const getRows = () => {
        let rows: string[][] = [];

        for (let i = 0; i < players.length; i += COL_COUNT) {
            rows.push(players.slice(i, i + COL_COUNT));
        }
        return rows;
    }

    return (  
        <RefSheetPaper elevation={8}>
            <TableContainer>
                <Table>
                    <CommandTableHead title='PLAYER INVITES' props={{ colSpan: COL_COUNT }}/>
                    <TableBody>
                        {getRows().map((row, rowIndex) =>
                            <StyledTableRow key={rowIndex}>
                                {row.map((player, playerIndex) => 
                                    <CommandTableCell key={rowIndex + playerIndex} command={{ 
                                        name: `Player ${rowIndex * COL_COUNT + playerIndex + 1}`, 
                                        command: `!mp invite ${player}` 
                                    }}/>
                                )}
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </RefSheetPaper>
    );
}
 
export default LobbyInviteCommands;