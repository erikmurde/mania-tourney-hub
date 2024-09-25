import { Menu, MenuItem, Tooltip } from '@mui/material';
import { StyledIconButton } from '../../../../styled/StyledIconButton';
import { Person } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../../routes/Root';
import { MatchDto } from '../../../../../dto/schedule/match/MatchDto';
import { REFEREE, STREAMER, COMMENTATOR, ADMIN, HOST } from '../../../../../constants';
import { AuthService } from '../../../../../services/authService';

interface IProps {
    match: MatchDto,
    tourneyId: string,
    editMatchRole: (add: boolean, role: string) => void
}

const MatchActionMenu = ({match, tourneyId, editMatchRole}: IProps) => {
    const { user } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const service = new AuthService();
    const open = Boolean(anchorEl);

    if (!user) {
        return <></>;
    }

    const handleClick = (add: boolean, role: string) => {
        editMatchRole(add, role);
        setAnchorEl(null);
    }

    const hasRoles = (...roles: string[]) => service.hasRoles(user, tourneyId, ...roles);

    const isReferee = match.referee === user.name;
    const isStreamer = match.streamer === user.name;
    const isCommentator = match.commentators.includes(user.name);

    const canAddRef = hasRoles(REFEREE) && !match.referee;
    const canAddStreamer = hasRoles(STREAMER) && !match.streamer;
    const canAddCommentator = hasRoles(COMMENTATOR) && match.commentators.length < 2 && !isCommentator;

    return (  
        <>
            {!match.concluded && !hasRoles(HOST, ADMIN) && 
            (canAddRef || canAddStreamer || canAddCommentator || isReferee || isStreamer || isCommentator) &&
            <Tooltip title='Manage roles'>
                <StyledIconButton 
                    color='primary' 
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                    <Person/>
                </StyledIconButton>
            </Tooltip>}
            <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                {canAddRef && 
                <MenuItem onClick={() => handleClick(true, REFEREE)}>
                    Set as referee
                </MenuItem>}
                {canAddStreamer &&
                <MenuItem onClick={() => handleClick(true, STREAMER)}>
                    Set as streamer
                </MenuItem>}
                {canAddCommentator && 
                <MenuItem onClick={() => handleClick(true, COMMENTATOR)}>
                    Set as commentator
                </MenuItem>}
                {isReferee && 
                <MenuItem onClick={() => handleClick(false, REFEREE)}>
                    Remove referee
                </MenuItem>}
                {isStreamer && 
                <MenuItem onClick={() => handleClick(false, STREAMER)}>
                    Remove streamer
                </MenuItem>}
                {isCommentator && 
                <MenuItem onClick={() => handleClick(false, COMMENTATOR)}>
                    Remove commentator
                </MenuItem>}
            </Menu>
        </>
    );
}

export default MatchActionMenu;