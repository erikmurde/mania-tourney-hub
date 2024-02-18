import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material"
import { useContext, useEffect } from 'react';
import { AuthContext } from '../routes/Root';
import { AuthService } from '../services/authService';
import { STORED_USER } from '../constants';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const service = new AuthService();

    useEffect(() => {
        if (user) {
            localStorage.setItem(STORED_USER, JSON.stringify(user));
        }
    }, [user]);

    const logout = () => {
        setUser(null);
        localStorage.removeItem(STORED_USER);
        navigate('/');
    }

    return (
        <AppBar sx={{ height: 70 }} position='static' elevation={2}>
            <Toolbar>
                <Typography sx={{ textDecoration: 'none', color: 'inherit' }}
                    variant='h6'
                    component={Link}
                    to='/'>
                    osu!mania Tourney Hub
                </Typography>
                <Box flexGrow={1}></Box>
                <Box>
                    {user 
                    ?   <IconButton onClick={logout}>
                            <Avatar sx={{ height: 50, width: 50 }}
                                alt='User profile'
                                src={user.avatar}/>
                        </IconButton>
                    :   <Button onClick={service.login} size='large' variant='outlined'>
                            Login
                        </Button>}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;