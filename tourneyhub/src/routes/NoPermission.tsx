import { Paper, Typography } from '@mui/material';

const NoPermission = () => {
    return (  
        <Paper className='flex-center' elevation={2} sx={{ height: 500 }}>
            <Typography variant='h4' color='error'>
                No permission!
            </Typography>
        </Paper>
    );
}

export default NoPermission;