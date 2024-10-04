import { CircularProgress, Grid, Typography } from '@mui/material';

interface IProps {
    name: string,
    display: boolean,
    loading?: boolean
}

const NoItems = ({name, display, loading = false}: IProps) => {

    if (!loading && !display) {
        return <></>;
    }

    return (  
        <Grid container minHeight={400} height={1} justifyContent='center' alignItems='center'>
            <Grid item>
                {loading 
                ?   <CircularProgress size={50}/> 
                :   <Typography variant='h3' fontSize={30}>
                        No {name} found
                    </Typography>}
            </Grid>
        </Grid>
    );
}
 
export default NoItems;