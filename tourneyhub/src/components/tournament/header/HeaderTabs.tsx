import { Grid, Tabs } from '@mui/material';
import { useContext, useState } from 'react';
import TourneyTab from '../TourneyTab';
import { AuthContext } from '../../../routes/Root';
import { HOST } from '../../../constants';

const HeaderTabs = () => {
    const [value, setValue] = useState(0);
    const { user } = useContext(AuthContext);

    const roles = user?.roles ?? [];
    const isHost = roles.filter(role => role.name === HOST).length > 0;

    return ( 
        <Grid container height={100} justifyContent='center' alignItems='center'>
            <Grid item>
                <Tabs sx={{ flexWrap: 'wrap' }} value={value} role='navigation' onChange={(e, value) => setValue(value)}>
                    <TourneyTab label='information' to='information'/>
                    {isHost ? <TourneyTab label='stages' to='stages'/> : []}
                    <TourneyTab label='mappools' to='mappools'/>
                    <TourneyTab label='schedule' to='schedule'/>
                    <TourneyTab label='players' to='players'/>
                    <TourneyTab label='staff' to='staff'/>
                    <TourneyTab label='statistics' to='statistics'/>
                </Tabs>
            </Grid>
        </Grid>

    );
}

export default HeaderTabs;