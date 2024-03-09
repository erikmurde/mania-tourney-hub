import { Menu, MenuItem, Tooltip } from '@mui/material';
import { StyledIconButton } from '../../../../styled/StyledIconButton';
import { Person } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../../routes/Root';
import { MatchDto } from '../../../../../dto/schedule/MatchDto';
import { REFEREE, STREAMER, COMMENTATOR, ADMIN, HOST } from '../../../../../constants';

interface IProps {
    match: MatchDto,
    getRights: (roles: string[]) => boolean,
    editMatchRole: (op: string, role: string) => void
}

const MatchActionMenu = ({match, getRights, editMatchRole}: IProps) => {
    const { user } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (op: string, role: string) => {
        editMatchRole(op, role);
        setAnchorEl(null);
    }

    const isReferee = user && match.referee === user.name;
    const isStreamer = user && match.streamer === user.name;
    const isCommentator = user && match.commentators.includes(user.name);

    const canAddRef = getRights([REFEREE]) && !match.referee;
    const canAddStreamer = getRights([STREAMER]) && !match.streamer;
    const canAddCommentator = getRights([COMMENTATOR]) && match.commentators.length < 2 && !isCommentator;

    return (  
        <>
            {!match.isDone && !getRights([HOST, ADMIN]) && 
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
                <MenuItem onClick={() => handleClick('+', REFEREE)}>
                    Set as referee
                </MenuItem>}
                {canAddStreamer &&
                <MenuItem onClick={() => handleClick('+', STREAMER)}>
                    Set as streamer
                </MenuItem>}
                {canAddCommentator && 
                <MenuItem onClick={() => handleClick('+', COMMENTATOR)}>
                    Set as commentator
                </MenuItem>}
                {isReferee && 
                <MenuItem onClick={() => handleClick('-', REFEREE)}>
                    Remove referee
                </MenuItem>}
                {isStreamer && 
                <MenuItem onClick={() => handleClick('-', STREAMER)}>
                    Remove streamer
                </MenuItem>}
                {isCommentator && 
                <MenuItem onClick={() => handleClick('-', COMMENTATOR)}>
                    Remove commentator
                </MenuItem>}
            </Menu>
        </>
    );
}

export default MatchActionMenu;