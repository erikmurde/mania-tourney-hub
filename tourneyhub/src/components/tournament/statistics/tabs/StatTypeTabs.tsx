import { Grid, Tabs, Tab } from '@mui/material';

interface IProps {
    teamTourney: boolean,
    showTeams: boolean,
    setShowTeams: (value: boolean) => void
}

const StatTypeTabs = ({teamTourney, showTeams, setShowTeams}: IProps) => {
    return (  
        <>
        {teamTourney &&
            <Grid item marginBottom={2}>
                <Tabs
                    indicatorColor='secondary'
                    textColor='secondary'
                    value={showTeams ? 1 : 0}
                    onChange={(_, value) => setShowTeams(value)}
                    >
                    <Tab label='teams' value={1}/>
                    <Tab label='players' value={0}/> 
                </Tabs>
        </Grid>}
        </>
    );
}

export default StatTypeTabs;