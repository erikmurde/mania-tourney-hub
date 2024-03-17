import { TableHead, TableRow } from '@mui/material';
import { STANDARD } from '../../../../constants';
import { SchedTableCell } from '../../../styled/SchedTableCell';

const StatsTableHead = ({stageType}: {stageType: string}) => {
    return (  
        <TableHead>
            <TableRow>
                <SchedTableCell align='center'>Map</SchedTableCell>
                <SchedTableCell>Artist and title</SchedTableCell>
                <SchedTableCell>Best player</SchedTableCell>
                <SchedTableCell width={60}>Score</SchedTableCell>
                <SchedTableCell width={50}>Acc</SchedTableCell>
                <SchedTableCell width={80}>Avg. score</SchedTableCell>
                <SchedTableCell width={70}>Avg. acc</SchedTableCell>
                {stageType === STANDARD && 
                <>
                <SchedTableCell width={40}>Picks</SchedTableCell>
                <SchedTableCell width={40}>Bans</SchedTableCell>
                <SchedTableCell width={50}>Protects</SchedTableCell>
                </>}
            </TableRow>
        </TableHead>
    );
}
 
export default StatsTableHead;