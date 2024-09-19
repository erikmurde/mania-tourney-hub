import { useEffect, useState } from 'react';
import { StaffApplicationDto } from '../../../dto/staff/StaffApplicationDto';
import { StaffApplicationService } from '../../../services/staffApplicationService';
import { Grid, Link } from '@mui/material';
import ProfileApplicationCard from './ProfileApplicationCard';

const ProfileApplications = ({onNavigate}: {onNavigate: (tournamentId: string) => void}) => {
    const [staffApplications, setStaffApplications] = useState([] as StaffApplicationDto[]);
    const [applicationUpdate, setApplicationUpdate] = useState(0);

    useEffect(() => {
        new StaffApplicationService()
            .getAllUser()
            .then(applications => setStaffApplications(applications));
    }, [applicationUpdate]);

    return (  
        <Grid container direction='column' rowSpacing={1}>
            {staffApplications.map(application => 
                <Grid item key={application.id}>
                    <ProfileApplicationCard 
                        application={application}
                        applicationUpdate={applicationUpdate}
                        setApplicationUpdate={setApplicationUpdate}
                        navLink={                  
                        <Link
                            sx={{ cursor: 'pointer' }} 
                            onClick={() => onNavigate(application.tournamentId)}
                            >
                            {application.tournament}
                        </Link>
                    }/>
                </Grid>    
            )}
        </Grid>
    );
}

export default ProfileApplications;