import { TableHead, TableRow } from '@mui/material';
import { SchedTableCell } from '../../../styled/SchedTableCell';

const StatsTableHead = ({showTeams}: {showTeams: boolean}) => {
    return (  
        <TableHead>
            <TableRow>
                <SchedTableCell align='center' sx={{ paddingRight: 1 }}>
                    Map
                </SchedTableCell>
                <SchedTableCell>Title</SchedTableCell>
                <SchedTableCell>
                    Best {showTeams ? 'team' : 'player'}
                </SchedTableCell>
                <SchedTableCell width={60}>Score</SchedTableCell>
                <SchedTableCell width={50}>Acc</SchedTableCell>
                <SchedTableCell width={80}>Avg. score</SchedTableCell>
                <SchedTableCell width={70}>Avg. acc</SchedTableCell>
            </TableRow>
        </TableHead>
    );
}
 
export default StatsTableHead;