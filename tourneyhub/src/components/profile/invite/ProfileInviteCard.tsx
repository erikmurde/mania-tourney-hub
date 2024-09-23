import { Card, Typography, Divider } from '@mui/material';
import { StaffInviteDto } from '../../../dto/staff/invite/StaffInviteDto';
import { StyledCardActions } from '../../styled/StyledCardActions';
import { StyledCardContent } from '../../styled/StyledCardContent';
import { StaffInviteService } from '../../../services/staffInviteService';
import ConfirmationDialog from '../../tournament/dialog/ConfirmationDialog';
import { useContext } from 'react';
import { AuthContext } from '../../../routes/Root';
import { ACCEPTED, REJECTED, ROLE_REG } from '../../../constants';

interface IProps {
    invite: StaffInviteDto,
    navLink: JSX.Element,
    updateState: () => void
}

const ProfileInviteCard = ({invite, navLink, updateState}: IProps) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <></>; 
    }

    const onAccept = async() => {
        user.roles.push({
            tournamentId: invite.tournamentId,
            name: invite.role,
            canRegWithRole: ROLE_REG.get(invite.role)!
        });
        editStatus(ACCEPTED);
    }

    const editStatus = async(status: string) => {
        await new StaffInviteService().edit(invite.id, {
            recipientPlayerId: user.playerId.toString(),
            recipientId: user.id.toString(),
            status: status
        });
        updateState();
    }

    return (  
        <Card elevation={12}>
            <StyledCardContent>
                <Typography fontWeight={500}>
                    Invite from {invite.sender}
                </Typography>
                <Divider sx={{ marginTop: 1, marginBottom: 1 }}/>
                <Typography marginBottom={1}>
                    {navLink} - Role of commentator
                </Typography>
                <Typography>
                    {invite.description}
                </Typography>
            </StyledCardContent>
            <StyledCardActions>
                <ConfirmationDialog 
                    title={'Are you sure you wish to accept this invite?'} 
                    actionTitle={'Accept'} 
                    action={onAccept}
                    btnProps={{ title: 'Accept', color: 'success' }}/>
                <ConfirmationDialog 
                    title={'Are you sure you wish to reject this invite?'} 
                    actionTitle={'Reject'} 
                    action={() => editStatus(REJECTED)}
                    btnProps={{ title: 'Reject', color: 'error' }}/>
            </StyledCardActions>
        </Card>
    );
}

export default ProfileInviteCard;