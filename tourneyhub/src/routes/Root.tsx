import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { createContext, useState } from 'react';
import { IUserDto } from '../dto/IUserDto';
import { STORED_USER } from '../constants';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface AuthContext {
    user: IUserDto | null,
    setUser: (user: IUserDto | null) => void
}

interface UpdateContext {
    stageUpdate: number,
    setStageUpdate: (count: number) => void,
    mapPoolUpdate: number,
    setMapPoolUpdate: (count: number) => void,
    scheduleUpdate: number,
    setScheduleUpdate: (cound: number) => void
}

export const AuthContext = createContext<AuthContext>({
    user: null,
    setUser: () => {}
});

export const UpdateContext = createContext<UpdateContext>({
    stageUpdate: 0,
    setStageUpdate: () => {},
    mapPoolUpdate: 0,
    setMapPoolUpdate: () => {},
    scheduleUpdate: 0,
    setScheduleUpdate: () => {}
})

const Root = () => {
    const stored = localStorage.getItem(STORED_USER);

    const [user, setUser] = useState(
        (stored !== 'undefined' ? JSON.parse(stored!) : null) as IUserDto | null
    );

    const [stageUpdate, setStageUpdate] = useState(0);
    const [mapPoolUpdate, setMapPoolUpdate] = useState(0);
    const [scheduleUpdate, setScheduleUpdate] = useState(0);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
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
    );
}

export default Root;