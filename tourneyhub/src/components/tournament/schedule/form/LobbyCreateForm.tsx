import { PlaylistAdd } from '@mui/icons-material';
import { Button } from '@mui/material';

const LobbyCreateForm = () => {
    return (  
        <Button 
            variant='contained' 
            sx={{ width: 150 }}
            startIcon={<PlaylistAdd/>}
            >
            Add lobby
        </Button>
    );
}
 
export default LobbyCreateForm;