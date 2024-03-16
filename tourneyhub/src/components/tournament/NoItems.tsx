import { Grid, Typography } from '@mui/material';

const NoItems = ({name}: {name: string}) => {
    return (  
        <Grid container justifyContent='center' alignItems='center' height={1}>
            <Typography variant='h3' fontSize={30}>
                No {name} to show
            </Typography>
        </Grid>
    );
}
 
export default NoItems;