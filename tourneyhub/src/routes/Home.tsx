import { Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (  
        <Paper className='flex-center' elevation={2} sx={{ height: '100%' }}>
            <Button variant='contained' size='large' onClick={() => navigate('/tournaments/0/mappools')}>
                Go to 6KAST
            </Button>
        </Paper>
    );
}

export default Home;