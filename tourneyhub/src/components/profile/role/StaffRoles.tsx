import { Typography, useTheme } from '@mui/material';

interface IProps {
    tourneyDone: boolean,
    staffRoles: string[]
}

const StaffRoles = ({tourneyDone, staffRoles}: IProps) => {
    const theme = useTheme();

    return (  
        <>
        <Typography fontWeight={700} color={theme.palette.secondary.main} marginBottom={0.5}>
            Staff
        </Typography>
        <Typography marginBottom={1}>
            {staffRoles.length > 0 
                ? `${tourneyDone ? 'Staffed' : 'Staffing'} as ${staffRoles.join(', ')}` 
                : `${tourneyDone ? 'Did not staff' : 'Not staffing'}`}
        </Typography>
        </>
    );
}
 
export default StaffRoles;