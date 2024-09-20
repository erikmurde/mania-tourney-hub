import { useEffect, useState } from 'react';
import { StaffApplicationDto } from '../../../dto/staff/application/StaffApplicationDto';
import { StaffApplicationService } from '../../../services/staffApplicationService';
import { Grid, Link } from '@mui/material';
import ProfileApplicationCard from './ProfileApplicationCard';
import { StatusService } from '../../../services/statusService';
import { RETRACTED } from '../../../constants';

const ProfileApplications = ({onNavigate}: {onNavigate: (tournamentId: string) => void}) => {
    const [staffApplications, setStaffApplications] = useState([] as StaffApplicationDto[]);
    const [applicationUpdate, setApplicationUpdate] = useState(0);

    useEffect(() => {
        new StaffApplicationService()
            .getAllUser()
            .then(applications => setStaffApplications(applications));
    }, [applicationUpdate]);

    const retractApplication = async(application: StaffApplicationDto) => {
        const status = await new StatusService()
            .getByName(RETRACTED);

        if (status) {
            await new StaffApplicationService().edit(application.id, {
                playerId: application.sender.playerId,
                tournamentId: application.tournamentId,
                statusId: status.id
            });
            setApplicationUpdate(applicationUpdate + 1);
        }
    }

    return (  
        <Grid container direction='column' rowSpacing={1}>
            {staffApplications.map(application => 
                <Grid item key={application.id}>
                    <ProfileApplicationCard 
                        application={application}
                        retractApplication={retractApplication}
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