import { Grid, Typography } from '@mui/material';

const SectionTitle = ({title}: {title: string}) => {
    return (  
        <Grid marginLeft={5} item xs={12}>
            <Typography variant='h2' 
                height={100} 
                fontSize={46} 
                fontWeight={400} 
                lineHeight={2}
                >
                {title}
            </Typography>
        </Grid>
    );
}
 
export default SectionTitle;