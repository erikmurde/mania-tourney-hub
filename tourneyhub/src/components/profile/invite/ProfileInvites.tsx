import { useEffect, useState } from 'react';
import { StaffInviteDto } from '../../../dto/staff/invite/StaffInviteDto';
import { StaffInviteService } from '../../../services/staffInviteService';
import { Grid, Link } from '@mui/material';
import ProfileInviteCard from './ProfileInviteCard';

const ProfileInvites = ({onNavigate}: {onNavigate: (tournamentId: number) => void}) => {
    const [staffInvites, setStaffInvites] = useState([] as StaffInviteDto[]);
    const [inviteUpdate, setInviteUpdate] = useState(0);

    useEffect(() => {
        new StaffInviteService()
            .getAllOfUser()
            .then(invites => setStaffInvites(invites));
    }, [inviteUpdate]);

    const updateState = () => {
        setInviteUpdate(inviteUpdate + 1);
    }

    return (  
        <Grid container direction='column'>
            {staffInvites
                .filter(invite => invite.status === 'pending')
                .map(invite => 
                <Grid item key={invite.id}>
                    <ProfileInviteCard 
                        invite={invite}
                        updateState={updateState}
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