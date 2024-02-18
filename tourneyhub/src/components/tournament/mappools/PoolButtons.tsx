import { Edit, PlaylistAdd, Public, Publish } from '@mui/icons-material';
import { Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PoolButtons = (props: {manage: boolean}) => {
    const navigate = useNavigate();

    if (props.manage) {
        return (
            <>
                <Grid item>
                    <Button variant='contained' startIcon={<PlaylistAdd/>} sx={{ width: 150 }}>
                        Add Map
                    </Button>
                </Grid>
                <Grid item>
                    <Button sx={{ width: 150 }}
                        variant='contained' 
                        startIcon={<Public/>}
                        onClick={() => navigate('../mappools')}>
                        Public View
                    </Button>
                </Grid>
            </>
        );
    } else {
        return (
            <>
                <Grid item>
                    <Button sx={{ width: 150 }} 
                        variant='contained' 
                        startIcon={<Edit/>}
                        onClick={() => navigate('../mappools/manage')}>
                        Manage
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant='contained' startIcon={<Publish/>} sx={{ width: 150 }}>
                        Publish
                    </Button>
                </Grid>
            </>
        );
    }
}

export default PoolButtons;