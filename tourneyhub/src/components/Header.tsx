import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../routes/Root';
import { AuthService } from '../services/authService';
import { STORED_USER } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import Profile from '../routes/profile/Profile';

const Header = () => {
    const { user, setUser } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [profileOpen, setProfileOpen] = useState(false);
    const open = Boolean(anchorEl);
    const service = new AuthService();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            localStorage.setItem(STORED_USER, JSON.stringify(user));
        }
    }, [user]);

    const logout = () => {
        setAnchorEl(null);
        setUser(null);
        localStorage.removeItem(STORED_USER);
        navigate('/');
    }

    return (
        <>
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
                    ?   <IconButton 
                            sx={{ height: 'auto' }}
                            onClick={(e) => setAnchorEl(e.currentTarget)}>
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
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => {
                setProfileOpen(true); 
                setAnchorEl(null)
            }}>
                Profile
            </MenuItem>
            <MenuItem onClick={logout}>
                Logout
            </MenuItem>
        </Menu>
        {user && 
        <Profile owner={user} open={profileOpen} setOpen={setProfileOpen}/>}
        </>
    );
}

export default Header;