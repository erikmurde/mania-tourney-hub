import { Tooltip } from '@mui/material';
import { StyledIconButton } from '../../styled/StyledIconButton';
import { TERTIARY } from '../../../constants';
import { Link } from '@mui/icons-material';

interface IProps {
    title: string,
    link: string
}

const MpLink = ({title, link}: IProps) => {
    return (  
        <Tooltip title={title}>
            <StyledIconButton 
                onClick={() => window.open(link, '_blank')}
                sx={{ color: TERTIARY }}>
                <Link/>
            </StyledIconButton>
        </Tooltip>
    );
}
 
export default MpLink;