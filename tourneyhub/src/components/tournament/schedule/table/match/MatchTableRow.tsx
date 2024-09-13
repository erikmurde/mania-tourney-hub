import { TableRow } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { MatchDto } from '../../../../../dto/schedule/MatchDto';
import { SchedTableCell } from '../../../../styled/SchedTableCell';
import MatchRowActions from './MatchRowActions';
import MatchTableScore from './MatchRowScore';
import MatchRowPlayer from './MatchRowPlayer';

interface IProps {
    match: MatchDto,
    refMatch: (match: MatchDto) => void
}

const MatchTableRow = ({match, refMatch}: IProps) => {
    dayjs.extend(utc);

    const p1Winner = match.isDone 
        ? (match.score1 < 0 || match.score1 > match.score2) && match.score2 >= 0 
        : false;

    const p2Winner = match.isDone ? !p1Winner : false;

    return (  
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: 50 }}>
            <SchedTableCell>
                {match.code}
            </SchedTableCell>
            <SchedTableCell>
                {dayjs.utc(match.time).format('ddd, MMM DD, HH:mm')}
            </SchedTableCell>
            <MatchRowPlayer
                player={match.player1} 
                matchDone={match.isDone} 
                winner={p1Winner}/>
            <MatchTableScore 
                score={match.score1} 
                matchDone={match.isDone} 
                winner={p1Winner}/>
            <MatchTableScore right 
                score={match.score2} 
                matchDone={match.isDone} 
                winner={p2Winner}/>
            <MatchRowPlayer right 
                player={match.player2} 
                matchDone={match.isDone} 
                winner={p2Winner}/>
            <SchedTableCell>{match.referee}</SchedTableCell>
            <SchedTableCell>{match.streamer}</SchedTableCell>
            <SchedTableCell>{match.commentators.join(', ')}</SchedTableCell>
            <MatchRowActions match={match} onRef={() => refMatch(match)}/>
        </TableRow>    
    );
}

export default MatchTableRow;