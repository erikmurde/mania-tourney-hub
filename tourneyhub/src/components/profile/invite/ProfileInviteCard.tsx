import { Card, Typography, Divider } from '@mui/material';
import { StaffInviteDto } from '../../../dto/staffInvite/StaffInviteDto';
import { StyledCardActions } from '../../styled/StyledCardActions';
import { StyledCardContent } from '../../styled/StyledCardContent';
import { StaffInviteService } from '../../../services/staffInviteService';
import ConfirmationDialog from '../../tournament/dialog/ConfirmationDialog';
import { useContext } from 'react';
import { AuthContext } from '../../../routes/Root';
import { AuthService } from '../../../services/authService';
import { ROLE_REG } from '../../../constants';

interface IProps {
    invite: StaffInviteDto,
    navLink: JSX.Element,
    inviteUpdate: number,
    setInviteUpdate: (update: number) => void
}

const ProfileInviteCard = ({invite, navLink, inviteUpdate, setInviteUpdate}: IProps) => {
    const { user } = useContext(AuthContext);
    const service = new StaffInviteService();

    if (!user || user.id !== invite.recipientId) {
        return <></>; 
    }

    const onAccept = async() => {
        invite.status = 'accepted';
        user.roles.push({
            tournamentId: invite.tournamentId,
            name: invite.role,
            canRegWithRole: ROLE_REG.get(invite.role)!
        });
        await new AuthService().edit(user.id, user);
        edit();
    }

    const onReject = () => {
        invite.status = 'rejected';
        edit();
    }

    const edit = async() => {
        await service.edit(invite.id, invite);
        setInviteUpdate(inviteUpdate + 1);
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
                    {invite.reason}
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
                    action={onReject}
                    btnProps={{ title: 'Reject', color: 'error' }}/>
            </StyledCardActions>
        </Card>
    );
}

export default ProfileInviteCard;