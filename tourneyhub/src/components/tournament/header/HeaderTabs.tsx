import { Grid, Tabs } from '@mui/material';
import { useContext, useState } from 'react';
import TourneyTab from '../TourneyTab';
import { AuthContext } from '../../../routes/Root';
import { TournamentDto } from '../../../dto/tournament/TournamentDto';
import { AuthService } from '../../../services/authService';
import { TAB_ID } from '../../../constants';

const HeaderTabs = ({tourney}: {tourney: TournamentDto}) => {
    const [value, setValue] = useState(Number(localStorage.getItem(TAB_ID)) ?? 0);
    const { user } = useContext(AuthContext);

    const isHost = user && new AuthService().isHost(user, tourney.id);
    const tourneyType = tourney.maxTeamSize > 1 ? 'teams' : 'players';

    const updateValue = (value: number) => {
        setValue(value);
        localStorage.setItem(TAB_ID, value.toString());
    }
    
    return ( 
        <Grid container padding={1} paddingBottom={2} justifyContent='center' alignItems='center'>
            <Grid item>
                <Tabs sx={{ flexWrap: 'wrap' }} value={value} role='navigation' onChange={(_, value) => updateValue(value)}>
                    <TourneyTab label='information' to='information'/>
                    {isHost ? <TourneyTab label='stages' to='stages'/> : []}
                    <TourneyTab label='mappools' to='mappools'/>
                    <TourneyTab label='schedule' to='schedule'/>
                    <TourneyTab label={tourneyType} to={tourneyType}/>
                    <TourneyTab label='staff' to='staff'/>
                    <TourneyTab label='statistics' to='statistics'/>
                </Tabs>
            </Grid>
        </Grid>

    );
}

export default HeaderTabs;