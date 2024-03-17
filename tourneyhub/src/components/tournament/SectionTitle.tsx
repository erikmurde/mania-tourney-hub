import { Grid, Typography } from '@mui/material';

interface IProps {
    title: string,
    xsAuto?: boolean
}

const SectionTitle = ({title, xsAuto}: IProps) => {
    return (  
        <Grid item xs={xsAuto ? 'auto' : 12} paddingLeft={5}>
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