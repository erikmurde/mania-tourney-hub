import { Paper, Grid, Button } from '@mui/material';
import TeamList from '../../../components/tournament/teams/TeamList';
import SectionTitle from '../../../components/tournament/SectionTitle';
import { TeamDto } from '../../../dto/team/TeamDto';
import { useEffect, useState } from 'react';
import { TeamService } from '../../../services/teamService';
import { useParams } from 'react-router-dom';
import { GroupAdd, Publish } from '@mui/icons-material';

const Teams = () => {
    const { id } = useParams();
    const [teams, setTeams] = useState([] as TeamDto[]);

    useEffect(() => {
        if (id) {
            new TeamService()
                .getTeams(id)
                .then(teams => setTeams(teams));
        }
    }, [id]);

    return (  
        <Paper elevation={2} sx={{ minHeight: 500, paddingBottom: 2 }}>
            <Grid container marginBottom={5}>
                <SectionTitle title='Teams'/>
                <Grid item xs={12} margin={5} marginTop={2}>
                    <Button 
                        variant='contained' 
                        startIcon={<Publish/>} 
                        sx={{ marginRight: 1, width: 150 }}
                        >
                        Publish
                    </Button>
                    <Button 
                        variant='contained' 
                        startIcon={<GroupAdd/>} 
                        sx={{ width: 150 }}
                        >
                        Add team
                    </Button>
                </Grid>
                <Grid item>
                    <TeamList teams={teams} setTeams={setTeams}/>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Teams;