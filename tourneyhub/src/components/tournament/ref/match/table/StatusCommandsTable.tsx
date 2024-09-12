import { TableContainer, Table, TableBody } from '@mui/material';
import { useEffect, useState } from 'react';
import { RefCommand } from '../../../../../domain/RefCommand';
import { RefPick } from '../../../../../domain/RefPick';
import { MatchDto } from '../../../../../dto/schedule/MatchDto';
import { StyledTableRow } from '../../../../styled/StyledTableRow';
import CommandTableCell from '../../CommandTableCell';
import RefTableHead from '../../CommandTableHead';

interface IProps {
    picks: RefPick[],
    match: MatchDto,
    bestOf: number
}

const StatusCommandsTable = ({picks, match, bestOf}: IProps) => {
    const [statusCommands, setStatusCommands] = useState([] as RefCommand[]);
    const p1 = match.player1.name;
    const p2 = match.player2.name;

    const nextPick = () => {
        const message = 'Next pick: ';
        const filtered = picks.filter(pick => pick.winner !== '');
        const maxScore = Math.floor(bestOf / 2) + 1;

        if (filtered.length === 0) {
            return picks.length > 0 ? message + picks[0].player : '';
        } else if (filtered.length === bestOf - 1) {
            return 'Tiebreaker';
        } else if (match.score1 === maxScore || match.score2 === maxScore) {
            return `${match.score1 === maxScore ? p1 : p2} wins the match!`;
        }
        
        return message + (filtered[filtered.length - 1].player === p1 ? p2 : p1);
    }

    const nextMap = () => {
        const filtered = picks.filter(pick => pick.beatmapId !== '');

        if (filtered.length === 0) {
            return 'none';
        }
        return `!mp map ${filtered[filtered.length - 1].beatmapId} 3`;
    }

    useEffect(() => {
        setStatusCommands([
            { name: 'Score', command: `${p1} ${match.score1} - ${match.score2} ${p2}` },
            { name: 'Status', command: nextPick() },
            { name: 'Next map', command: nextMap() },
            { name: 'Map mod', command: '!mp mods Freemod' }
        ])
    }, [picks, match.score1, match.score2]);

    return (  
        <TableContainer>
            <Table>
                <RefTableHead title='MATCH STATUS' props={{ sx: { fontWeight: 500 } }}/>
                <TableBody>
                    {statusCommands.map(command => 
                        <StyledTableRow key={command.name}>
                            <CommandTableCell command={command}/>
                        </StyledTableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
 
export default StatusCommandsTable;