import { Grid, Paper, Typography } from '@mui/material';
import { IUserDto } from '../../../dto/user/IUserDto';
import StaffCard from './StaffCard';

interface IProps {
    name: string,
    groupRole: string,
    staff: IUserDto[],
    removeStaffRole: (member: IUserDto, groupRole: string) => void
}

const StaffGroup = ({name, groupRole, staff, removeStaffRole}: IProps) => {

    return (  
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
                    {staff.map(member => 
                        <Grid item key={member.id}>
                            <StaffCard 
                                staff={member} 
                                removeStaff={() => removeStaffRole(member, groupRole)}/>
                        </Grid>
                    )}
                </Grid>
            </Paper>
        </Grid>
    );
}

export default StaffGroup;