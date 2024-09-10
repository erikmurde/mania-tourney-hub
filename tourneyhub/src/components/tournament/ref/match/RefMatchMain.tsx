import { Button, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import { MatchDto } from '../../../../dto/schedule/MatchDto';
import { Check } from '@mui/icons-material';
import { FastField } from 'formik';

interface IProps {
    match: MatchDto,
    stageName: string
}

const RefMatchMain = ({match, stageName}: IProps) => {
    const { tourney } = useTourney();

    return (  
        <Paper elevation={8} sx={{ padding: 1, paddingBottom: 0 }}>
            <Grid container direction='column'>
                <Grid item>
                    <Typography fontWeight={500} padding={1}>
                        {tourney.code} {stageName} match {match.code}
                    </Typography>
                </Grid>
                <Divider/>
                <Grid item>
                    <Typography fontSize={14} padding={1}>
                        !mp make {tourney.code}: {match.player1.name} vs {match.player2.name} 
                    </Typography>
                </Grid>
                <Divider/>
                <Grid item padding={1}>
                    <FastField name='mpLink' label='MP link' as={TextField} size='small'/>
                </Grid>
                <Divider/>
                <Grid item padding={1}>
                    <Button variant='contained' color='success' startIcon={<Check/>} sx={{ marginRight: 1 }}>
                        Conclude
                    </Button>
                    <Button variant='contained' color='secondary'>
                        Mark as wbd
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}
 
export default RefMatchMain;