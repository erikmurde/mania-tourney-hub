import { Grid, Typography, useTheme } from '@mui/material';
import { SUFFIX_MAP } from '../../../constants';

interface IProps {
    tourneyDone: boolean,
    teamName: string | undefined,
    seeding: number,
    placement: number
}

const PlayerRoles = ({tourneyDone, teamName, seeding, placement}: IProps) => {
    const theme = useTheme();

    return (  
        <Grid container direction='column'>
            <Typography fontWeight={700} color={theme.palette.primary.main} marginBottom={0.5}>
                {teamName ? 'Team' : 'Player'}
            </Typography>
            {teamName &&
            <Grid item>
                <Typography>
                    Team name - {teamName}
                </Typography>
            </Grid>}
            <Grid item>
                {seeding !== undefined && 
                <Typography>
                    {seeding > 0 
                    ? `Seeded ${seeding}${SUFFIX_MAP.get(seeding) ?? 'th'}` 
                    : 'Seeding undecided'}
                </Typography>}
            </Grid>
            <Grid item>
                {placement !== undefined && 
                <Typography>
                    {placement > 0 
                    ? `Placed ${placement}${SUFFIX_MAP.get(placement) ?? 'th'}` 
                    : 'Placement undecided'}
                </Typography>}
            </Grid>
            {seeding === undefined && 
            <Grid item>
                {tourneyDone ? 'Did not play' : 'Not playing'}
            </Grid>}
        </Grid>
    );
}
 
export default PlayerRoles;