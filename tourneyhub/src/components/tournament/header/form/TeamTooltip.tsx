import { Tooltip } from '@mui/material';
import { TournamentDto } from '../../../../dto/tournament/TournamentDto';
import { Info } from '@mui/icons-material';

const TeamTooltip = ({tourney}: {tourney: TournamentDto}) => {

    const countries = tourney.countries;

    const getRankText = () => {
        const min = tourney.minPlayerRank;
        const max = tourney.maxPlayerRank;

        if (min === 0 && max === 0) {
            return '';
        }
        if (min > 0 && max > 0) {
            return `Ranks: ${min} - ${max}`;
        }
        return `${min > 0 ? 'Minimum' : 'Maximum'} rank: ${min > 0 ? min : max}`;
    }

    return (  
        <Tooltip title={
            <div>
                {countries.length > 0 && `Countries: ${countries.join(', ')}`}
                <br/>
                {getRankText()}
            </div>}>
            <Info color='primary'/>
        </Tooltip>
    );
}
 
export default TeamTooltip;