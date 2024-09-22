import { Grid, Paper, Typography } from '@mui/material';
import { UserDto } from '../../../dto/user/UserDto';
import StaffCard from './StaffCard';

interface IProps {
    name: string,
    groupRole: string,
    staff: UserDto[],
    removeStaffRole: (member: UserDto, groupRole: string) => void
}

const StaffGroup = ({name, groupRole, staff, removeStaffRole}: IProps) => {
    return (  
        <>
        {staff.length > 0 &&
        <Grid item>
            <Paper elevation={2} sx={{ paddingBottom: 2 }}>
                <Typography 
                    variant='h3' 
                    fontSize={36} 
                    height={80} 
                    lineHeight={2} 
                    marginLeft={5} 
                    marginBottom={2}
                    >
                    {name}
                </Typography>
                <Grid container spacing={1} justifyContent='center'>
                    {staff.length === 0 && 
                    <Typography fontSize={20}>
                        No staff here yet
                    </Typography>}
                    {staff.map(member => 
                        <Grid item key={member.id}>
                            <StaffCard 
                                staff={member} 
                                removeStaff={() => removeStaffRole(member, groupRole)}/>
                        </Grid>
                    )}
                </Grid>
            </Paper>
        </Grid>}
        </>
    );
}

export default StaffGroup;