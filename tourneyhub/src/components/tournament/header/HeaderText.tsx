import { Grid, Typography } from '@mui/material';

interface IProps {
    name: string,
    description: string
}

const HeaderText = (props: IProps) => {
    return (  
        <Grid container textAlign='center' justifyContent='center'>
            <Grid item xs={12} height={90}>
                <Typography variant='h1' fontSize={50} fontWeight={400} lineHeight={1.8}>
                    {props.name}
                </Typography>
            </Grid>
            <Grid item height={120}>
                <Typography maxWidth={800}>
                    {props.description}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default HeaderText;