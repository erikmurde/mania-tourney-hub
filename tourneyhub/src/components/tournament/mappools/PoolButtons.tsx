import { Edit, Public, Publish } from '@mui/icons-material';
import { Grid, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import MapSelectForm from './form/MapSelectForm';

const PoolButtons = ({manage}: {manage?: boolean}) => {
    const navigate = useNavigate();
    const location = useLocation();

    if (manage) {
        return (
            <>            
                <Grid item>
                    <MapSelectForm/>
                </Grid>
                <Grid item>
                    <Button sx={{ width: 150 }}
                        variant='contained' 
                        startIcon={<Public/>}
                        onClick={() => navigate(`../mappools${location.hash}`)}>
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
                        onClick={() => navigate(`../mappools/manage${location.hash}`)}>
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