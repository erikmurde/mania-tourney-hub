import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Shadows, ThemeProvider, createTheme } from '@mui/material';

import Root from './routes/Root';
import MapPool from './routes/tournament/mappool/MapPool';
import TournamentHeader from './routes/tournament/TournamentHeader';
import Home from './routes/Home';
import Callback from './routes/Callback';
import Information from './routes/tournament/information/Information';
import Stages from './routes/tournament/stages/Stages';
import Schedule from './routes/tournament/schedule/Schedule';
import Players from './routes/tournament/players/Players';
import Staff from './routes/tournament/staff/Staff';
import Statistics from './routes/tournament/statistics/Statistics';
import Teams from './routes/tournament/players/Teams';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root/>,
		children: [
            {
                path: '',
                element: <Home/>
            },
            {
                path: 'auth/callback',
                element: <Callback/>
            },
            {
                path: 'tournaments/:id/',
                element: <TournamentHeader/>,
                children: [
                    {
                        path: 'information',
                        element: <Information/>
                    },
                    {
                        path: 'stages',
                        element: <Stages/>
                    },
                    {
                        path: 'mappools',
                        element: <MapPool/>
                    },
                    {
                        path: 'schedule',
                        element: <Schedule/>
                    },
                    {
                        path: 'players',
                        element: <Players/>
                    },
                    {
                        path: 'teams',
                        element: <Teams/>
                    },
                    {
                        path: 'staff',
                        element: <Staff/>
                    },
                    {
                        path: 'statistics',
                        element: <Statistics/>
                    }
                ]
            }
        ]
	}
]);

const white = '#F5F5F5';
const bg = '#121212';

const appTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#64B5F6',
            dark: '#2196F3'
        },
        secondary: {
            main: '#F6A664',
            dark: '#ED8F5E'
        },
        success: {
            main: '#66BB6A',
            contrastText: bg
        },
        error: {
            main: '#EF5350',
            contrastText: bg
        },
        text: {
            primary: white
        },
        action: {
            active: white
        }
    },
    shadows: Array(25).fill('none') as Shadows,
    spacing: 10
});

const root = ReactDOM.createRoot(
  	document.getElementById('root') as HTMLElement
);

root.render(

		<ThemeProvider theme={appTheme}>
			<RouterProvider router={router}/>
		</ThemeProvider>

);