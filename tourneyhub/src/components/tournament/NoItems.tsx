import { Grid, Typography } from '@mui/material';

const NoItems = ({name}: {name: string}) => {
    return (  
        <Grid container justifyContent='center' alignItems='center' flexGrow={1}>
            <Typography variant='h3' fontSize={30}>
                No {name} here yet
            </Typography>
        </Grid>
    );
}
 
export default NoItems;