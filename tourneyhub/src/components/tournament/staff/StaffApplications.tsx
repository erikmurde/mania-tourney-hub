import { Grid, Paper, Typography } from '@mui/material';
import StaffApplicationCard from './StaffApplicationCard';
import { StaffApplicationDto } from '../../../dto/staff/application/StaffApplicationDto';
import NoItems from '../NoItems';

interface IProps {
    loading: boolean,
    applications: StaffApplicationDto[],
    updateStatus: (application: StaffApplicationDto, newStatus: string) => Promise<void>
}

const StaffApplications = ({loading, applications, updateStatus}: IProps) => {
    return (  
        <Grid item>
            <Paper elevation={2} sx={{ paddingBottom: 2, minHeight: 600 }}>
                <Typography 
                    variant='h3' 
                    fontSize={36} 
                    height={80} 
                    lineHeight={2} 
                    marginLeft={5} 
                    marginBottom={2}
                    >
                    Staff applications
                </Typography>
                {!loading &&
                <Grid container spacing={2} justifyContent='center'>
                    {applications.map(application => 
                        <Grid item key={application.id}>
                            <StaffApplicationCard
                                application={application} 
                                updateStatus={updateStatus}/>
                        </Grid>
                    )}
                </Grid>}
                <NoItems name='applications' loading={loading} display={applications.length === 0}/>
            </Paper>
        </Grid>
    );
}
 
export default StaffApplications;