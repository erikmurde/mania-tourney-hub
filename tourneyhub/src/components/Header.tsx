import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { useContext, useState } from 'react';
import { AuthContext } from '../routes/Root';
import { Link } from 'react-router-dom';
import Profile from '../routes/profile/Profile';
import { LOGIN_URL, LOGOUT_URL } from '../constants';

const Header = () => {
    const { user } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [profileOpen, setProfileOpen] = useState(false);
    const open = Boolean(anchorEl);

    const login = () => window.location.assign(LOGIN_URL);

    const logout = () => window.location.assign(LOGOUT_URL);

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
                    :   <Button onClick={login} size='large' variant='outlined'>
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