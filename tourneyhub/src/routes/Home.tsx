import { Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (  
        <Paper className='flex-center' elevation={2} sx={{ height: '100%', flexDirection: 'column' }}>
            <Button variant='contained' size='large' onClick={() => navigate('/tournaments/0/information')} sx={{ marginBottom: 1 }}>
            Go to 6KAST
            </Button>
            <Button variant='contained' size='large' onClick={() => navigate('/tournaments/1/information')}>
            Go to 4KMWC2023
            </Button>
        </Paper>
    );
}

export default Home;