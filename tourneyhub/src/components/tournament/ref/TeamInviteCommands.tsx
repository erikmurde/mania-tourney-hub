import { Grid, Typography, useTheme } from '@mui/material';
import { RefSheetPaper } from '../../styled/RefSheetPaper';
import { TeamDtoSimple } from '../../../dto/team/TeamDtoSimple';
import { useEffect, useState } from 'react';
import { TeamService } from '../../../services/teamService';
import { useParams } from 'react-router-dom';
import TeamInvites from './qualifier/TeamInvites';

const TeamInviteCommands = ({teamNames, isMatch}: {teamNames: string[], isMatch?: boolean}) => {
    const { id } = useParams();
    const [teams, setTeams] = useState([] as TeamDtoSimple[]);
    const theme = useTheme();

    useEffect(() => {
        if (id) {
            new TeamService()
                .getTeamsByName(id, teamNames)
                .then(teams => setTeams(teams));
        }
    }, [id]);

    return (  
        <RefSheetPaper elevation={8}>
            <Grid container paddingTop={1} paddingBottom={1} rowGap={2}>
                <Grid item xs={12}>
                    <Typography fontWeight={500} fontSize={14} paddingLeft={0.5}>
                        PLAYER INVITES
                    </Typography>
                </Grid>
                {teams.map((team, index) => 
                    <Grid item xs={4} key={team.name}>
                        <TeamInvites 
                            team={team} 
                            bgColor={index % 2 === 1 && isMatch ? theme.palette.error.main : undefined}/>
                    </Grid>
                )}
            </Grid>
        </RefSheetPaper>
    );
}
 
export default TeamInviteCommands;