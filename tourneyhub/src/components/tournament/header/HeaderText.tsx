import { Grid, Typography } from '@mui/material';

interface IProps {
    name: string,
    description: string
}

const HeaderText = (props: IProps) => {
    return (  
        <Grid container textAlign='center' justifyContent='center'>
            <Grid item xs={12} paddingBottom={1} paddingTop={2} alignContent='center'>
                <Typography variant='h1' fontSize={50} fontWeight={400}>
                    {props.name}
                </Typography>
            </Grid>
            <Grid item padding={1} alignContent='center'>
                <Typography maxWidth={800}>
                    {props.description}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default HeaderText;