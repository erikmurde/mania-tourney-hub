import { useEffect, useState } from 'react';
import { StaffInviteDto } from '../../../dto/staff/StaffInviteDto';
import { StaffInviteService } from '../../../services/staffInviteService';
import { Grid, Link } from '@mui/material';
import ProfileInviteCard from './ProfileInviteCard';

interface IProps {
    userId: number,
    onNavigate: (tournamentId: number) => void
}

const ProfileInvites = ({userId, onNavigate}: IProps) => {
    const [staffInvites, setStaffInvites] = useState([] as StaffInviteDto[]);
    const [inviteUpdate, setInviteUpdate] = useState(0);

    useEffect(() => {
        new StaffInviteService()
            .getByUser(userId)
            .then(invites => setStaffInvites(invites));
    }, [inviteUpdate]);

    return (  
        <Grid container direction='column'>
            {staffInvites
                .filter(invite => invite.status === 'pending')
                .map(invite => 
                <Grid item key={invite.id}>
                    <ProfileInviteCard 
                        invite={invite}
                        inviteUpdate={inviteUpdate}
                        setInviteUpdate={setInviteUpdate}
                        navLink={                  
                        <Link 
                            sx={{ cursor: 'pointer' }} 
                            onClick={() => onNavigate(invite.tournamentId)}
                            >
                            {invite.tournament}
                        </Link>
                    }/>
                </Grid>    
            )}
        </Grid>
    );
}

export default ProfileInvites;