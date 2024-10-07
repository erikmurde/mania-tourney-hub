import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { createContext, useEffect, useState } from 'react';
import { UserDto } from '../dto/user/UserDto';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuthService } from '../services/authService';
import ErrorDialog from '../components/ErrorDialog';
import { ApiErrorResponse } from '../dto/ApiErrorResponse';

interface IAuthContext {
    user: UserDto | null,
    updateUser: () => void
}

interface IUpdateContext {
    stageUpdate: number,
    setStageUpdate: (count: number) => void,
    mapPoolUpdate: number,
    setMapPoolUpdate: (count: number) => void,
    scheduleUpdate: number,
    setScheduleUpdate: (cound: number) => void
}

interface IErrorContext {
    setError: (error: ApiErrorResponse | null) => void
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    updateUser: () => {}
});

export const UpdateContext = createContext<IUpdateContext>({
    stageUpdate: 0,
    setStageUpdate: () => {},
    mapPoolUpdate: 0,
    setMapPoolUpdate: () => {},
    scheduleUpdate: 0,
    setScheduleUpdate: () => {}
})

export const ErrorContext = createContext<IErrorContext>({
    setError: () => {}
});

const Root = () => {
    const [user, setUser] = useState(null as UserDto | null);
    const [error, setError] = useState(null as ApiErrorResponse | null);

    const [stageUpdate, setStageUpdate] = useState(0);
    const [mapPoolUpdate, setMapPoolUpdate] = useState(0);
    const [scheduleUpdate, setScheduleUpdate] = useState(0);

    useEffect(() => {
        updateUser();
    }, []);

    const updateUser = () => {
        new AuthService()
            .getMe()
            .then(user => setUser(user === '' ? null : user));
    }

    return (
        <ErrorContext.Provider value={{ setError }}>
            <AuthContext.Provider value={{ user, updateUser }}>
                <UpdateContext.Provider value={{ 
                    stageUpdate, setStageUpdate, mapPoolUpdate, setMapPoolUpdate, scheduleUpdate, setScheduleUpdate 
                }}>
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
                </UpdateContext.Provider>
            </AuthContext.Provider>
            {error &&
            <ErrorDialog error={error} setError={setError}/>}
        </ErrorContext.Provider>
    );
}

export default Root;