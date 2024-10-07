import { useContext, useEffect, useState } from 'react';
import { StaffApplicationDto } from '../../../dto/staff/application/StaffApplicationDto';
import { StaffApplicationService } from '../../../services/staffApplicationService';
import { Grid, Link } from '@mui/material';
import ProfileApplicationCard from './ProfileApplicationCard';
import { StatusService } from '../../../services/statusService';
import { RETRACTED } from '../../../constants';
import { ErrorContext } from '../../../routes/Root';

const ProfileApplications = ({onNavigate}: {onNavigate: (tournamentId: string) => void}) => {
    const { setError } = useContext(ErrorContext);
    const [staffApplications, setStaffApplications] = useState([] as StaffApplicationDto[]);
    const [applicationUpdate, setApplicationUpdate] = useState(0);

    useEffect(() => {
        new StaffApplicationService()
            .getAllUser()
            .then(applications => setStaffApplications(applications));
    }, [applicationUpdate]);

    const retractApplication = async(application: StaffApplicationDto) => {
        const service = new StatusService();
        const status = await service.getByName(RETRACTED);

        if (service.isErrorResponse(status)) {
            return setError(status);
        }
        const error = await new StaffApplicationService().edit(application.id, {
            senderId: application.sender.id,
            tournamentId: application.tournamentId,
            statusId: status.id
        });
        if (error) {
            return setError(error);
        }
        setApplicationUpdate(applicationUpdate + 1);
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