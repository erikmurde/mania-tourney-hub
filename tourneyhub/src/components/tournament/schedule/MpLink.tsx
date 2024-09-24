import { Tooltip } from '@mui/material';
import { StyledIconButton } from '../../styled/StyledIconButton';
import { TERTIARY } from '../../../constants';
import { Link } from '@mui/icons-material';

interface IProps {
    title: string,
    matchId: number
}

const MpLink = ({title, matchId}: IProps) => {
    return (  
        <Tooltip title={title}>
            <StyledIconButton 
                onClick={() => window.open(`https://osu.ppy.sh/community/matches/${matchId}`, '_blank')}
                sx={{ color: TERTIARY }}>
                <Link/>
            </StyledIconButton>
        </Tooltip>
    );
}
 
export default MpLink;