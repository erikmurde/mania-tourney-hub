import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { createContext, useState } from 'react';
import { IUserDto } from '../dto/IUserDto';
import { STORED_USER } from '../constants';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface IAuthContext {
    user: IUserDto | null,
    setUser: (user: IUserDto | null) => void
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    setUser: () => {}
});

const Root = () => {
    const stored = localStorage.getItem(STORED_USER);

    const [user, setUser] = useState(
        (stored !== 'undefined' ? JSON.parse(stored!) : null) as IUserDto | null
    );

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container minHeight='100vh' direction='column' alignItems='center'>
                    <Grid item width={1}>
                        <Header />
                    </Grid>
                    <Grid item xs paddingTop={2} paddingBottom={4} width={1} sx={{ maxWidth: '1400px !important' }}>
                        <Outlet />
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </AuthContext.Provider>
    );
}

export default Root;