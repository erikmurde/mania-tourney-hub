import { TableContainer, Table, TableHead, TableRow, TableBody } from '@mui/material';
import { SchedTableCell } from '../../../../styled/SchedTableCell';
import CommandTableRow from './CommandTableRow';
import { useEffect, useState } from 'react';
import { RefCommand } from '../../../../../domain/RefCommand';
import { RefPick } from '../../../../../domain/RefPick';
import { MatchDto } from '../../../../../dto/schedule/MatchDto';
import { StyledTableRow } from '../../../../styled/StyledTableRow';

interface IProps {
    picks: RefPick[],
    match: MatchDto
}

const StatusCommandsTable = ({picks, match}: IProps) => {
    const [statusCommands, setStatusCommands] = useState([] as RefCommand[]);
    const p1 = match.player1.name;
    const p2 = match.player2.name;

    const nextPick = () => {
        const message = 'Next player to pick: '
        const filtered = picks.filter(pick => pick.winner !== '');

        if (filtered.length === 0) {
            return picks.length > 0 ? message + picks[0].player : '';
        }
        return message + filtered[filtered.length - 1].player === p1 ? p2 : p1;
    }

    const nextMap = () => {
        const filtered = picks.filter(pick => pick.beatmapId !== '');

        if (filtered.length === 0) {
            return '';
        }
        return `!mp map ${filtered[filtered.length - 1].beatmapId} 3`;
    }

    useEffect(() => {
        setStatusCommands([
            { name: 'Score', command: `${p1} ${match.score1} - ${match.score2} ${p2}` },
            { name: 'Next pick', command: nextPick() },
            { name: 'Next map', command: nextMap() },
            { name: 'Map mod', command: '!mp mods Freemod' }
        ])
    }, [picks]);

    return (  
        <TableContainer>
            <Table>
                <TableHead>
                    <StyledTableRow>
                        <SchedTableCell colSpan={3} sx={{ fontWeight: 500 }}>
                            MATCH STATUS
                        </SchedTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {statusCommands.map((command, index) => 
                        <CommandTableRow key={index} command={command}/>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
 
export default StatusCommandsTable;