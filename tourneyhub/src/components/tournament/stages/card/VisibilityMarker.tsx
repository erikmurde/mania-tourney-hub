import { Grid, Typography, useTheme } from '@mui/material';

interface IProps {
    title: string,
    isPublic: boolean
}

const VisibilityMarker = ({title, isPublic}: IProps) => {
    const theme = useTheme();

    return (  
        <Grid item>
            <Typography fontSize={14}>
                {`${title}: `} 
                <span style={{ color: isPublic
                    ? theme.palette.success.main 
                    : theme.palette.error.main }}
                    >
                    {isPublic ? 'public' : 'private'}
                </span>
            </Typography>
        </Grid>
    );
}

export default VisibilityMarker;