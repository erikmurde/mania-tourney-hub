import { PlaylistAdd } from '@mui/icons-material';
import { Button } from '@mui/material';

const MatchCreateForm = () => {
    return (  
        <Button 
            variant='contained' 
            sx={{ width: 150 }}
            startIcon={<PlaylistAdd/>}
            >
            Add match
        </Button>
    );
}
 
export default MatchCreateForm;