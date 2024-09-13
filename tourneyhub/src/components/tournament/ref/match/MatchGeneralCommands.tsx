import { MatchDto } from '../../../../dto/schedule/MatchDto';
import { RefSheetPaper } from '../../../styled/RefSheetPaper';
import { RefCommand } from '../../../../domain/RefCommand';
import { TableContainer, Table, TableBody } from '@mui/material';
import { StyledTableRow } from '../../../styled/StyledTableRow';
import TimerCommands from '../TimerCommands';
import CommandTableCell from '../CommandTableCell';
import RefTableHead from '../CommandTableHead';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';

const RefMatchCommands = ({match}: {match: MatchDto}) => {
    const { tourney } = useTourney();
    const isTeam = tourney.minTeamSize > 1;

    const getGeneralCommands = () => {
        let generalCommands: RefCommand[] = [
            { name: 'Roll', command: '!mp roll' },
            { name: 'Settings', command: '!mp settings' },
            { name: 'Room setup', command: '!mp set 0 3 3' },
            { name: 'Close room', command: '!mp close' }
        ];
        if (!isTeam) {
            generalCommands.push(...[
                { name: 'Invite player 1', command: `!mp invite ${match.player1.name}` },
                { name: 'Invite player 2', command: `!mp invite ${match.player2.name}` }
            ]);
        }  
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
        <RefSheetPaper elevation={8} sx={{ height: 1 }}>
            <TableContainer>
                <Table>
                    <RefTableHead title='GENERAL COMMANDS' props={{ sx: { fontWeight: 500 } }}/>
                    <TableBody>
                        {getGeneralCommands().map(command => 
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
 
export default RefMatchCommands;