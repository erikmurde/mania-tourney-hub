import { SchedTableCell } from '../../../../styled/SchedTableCell';
import { useTheme } from '@mui/material';

interface IProps {
    score: number,
    winner: boolean,
    matchDone: boolean,
    right?: boolean
}

const MatchRowScore = ({score, winner, matchDone, right}: IProps) => {
    const theme = useTheme();

    const color = matchDone 
    ?   (winner ? theme.palette.text.primary : theme.palette.text.secondary) 
    :   theme.palette.text.primary;

    return (  
        <SchedTableCell 
            align={right ? 'right' : 'left'} 
            width={17.5} 
            sx={{ 
                paddingLeft: right ? 0 : 0.5, 
                paddingRight: right ? 0.5 : 0,
                fontWeight: winner ? 700 : 400,
                fontSize: 16,
                color: color
            }}>
            {score}
        </SchedTableCell>
    );
}
 
export default MatchRowScore;