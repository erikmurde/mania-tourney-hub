import { TableHead, TableRow } from '@mui/material';
import { SchedTableCell } from '../../../../styled/SchedTableCell';

const MatchTableHead = () => {
    return (  
        <TableHead sx={{ height: 50 }}>
            <TableRow>
                <SchedTableCell width={65}>
                    Match ID
                </SchedTableCell>
                <SchedTableCell>Match Time (UTC)</SchedTableCell>
                <SchedTableCell align='right' sx={{ paddingRight: 3.5 }}>
                    Player 1
                </SchedTableCell>
                <SchedTableCell align='center' colSpan={2} sx={{ padding: 0 }}>
                    Score
                </SchedTableCell>
                <SchedTableCell sx={{ paddingLeft: 3.5 }}>
                    Player 2
                </SchedTableCell>
                <SchedTableCell>Referee</SchedTableCell>
                <SchedTableCell>Streamer</SchedTableCell>
                <SchedTableCell>Commentators</SchedTableCell>
                <SchedTableCell align='center'>
                    Actions
                </SchedTableCell>
            </TableRow>
        </TableHead>
    );
}

export default MatchTableHead;