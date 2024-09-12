import { RefPick } from '../../../../domain/RefPick';
import { MatchDto } from '../../../../dto/schedule/MatchDto';
import StatusCommandsTable from './table/StatusCommandsTable';
import { RefSheetPaper } from '../../../styled/RefSheetPaper';
import { RefCommand } from '../../../../domain/RefCommand';
import { TableContainer, Table, TableBody } from '@mui/material';
import { StyledTableRow } from '../../../styled/StyledTableRow';
import TimerCommands from '../TimerCommands';
import CommandTableCell from '../CommandTableCell';
import RefTableHead from '../CommandTableHead';

interface IProps {
    match: MatchDto,
    bestOf: number,
    picks: RefPick[]
}

const RefMatchCommands = ({match, picks, bestOf}: IProps) => {

    const getGeneralCommands = () => {
        let generalCommands: RefCommand[] = [
            { name: 'Roll', command: '!mp roll' },
            { name: 'Settings', command: '!mp settings' },
            { name: 'Room setup', command: '!mp set 0 3 3' },
            { name: 'Close room', command: '!mp close' },
            { name: 'Invite player 1', command: `!mp invite ${match.player1.name}` },
            { name: 'Invite player 2', command: `!mp invite ${match.player2.name}` }
        ];

        if (match.streamer !== '') {
            generalCommands.push(
                { name: 'Add streamer', command: `!mp addref ${match.streamer}` }
            );
        }
        match.commentators.forEach((comm, index) => {
            generalCommands.push(
                { name: `Add caster ${index + 1}`, command: `!mp addref ${comm}` }
            );
        });
        return generalCommands;
    }

    return (  
        <>
            <RefSheetPaper elevation={8} sx={{ marginBottom: 1 }}>
                <StatusCommandsTable picks={picks} match={match} bestOf={bestOf}/>
            </RefSheetPaper>
            <RefSheetPaper elevation={8}>
                <TableContainer>
                    <Table>
                        <RefTableHead title='GENERAL COMMANDS' props={{ sx: { fontWeight: 500 } }}/>
                        <TableBody>
                            {getGeneralCommands().map((command, index) => 
                                <StyledTableRow>
                                    <CommandTableCell key={index} command={command}/>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TimerCommands/>
            </RefSheetPaper>
        </>
    );
}
 
export default RefMatchCommands;