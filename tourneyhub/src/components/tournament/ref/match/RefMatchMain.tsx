import { Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import { MatchDto } from '../../../../dto/schedule/MatchDto';
import { Check } from '@mui/icons-material';
import { FastField } from 'formik';
import MatchWbdForm from './form/MatchWbdForm';
import { MatchWbdDto } from '../../../../dto/ref/MatchWbdDto';
import { useContext } from 'react';
import { UpdateContext } from '../../../../routes/Root';
import { MatchService } from '../../../../services/matchService';
import ConfirmationDialog from '../../dialog/ConfirmationDialog';

interface IProps {
    match: MatchDto,
    stageName: string,
    onClose: () => void
}

const RefMatchMain = ({match, stageName, onClose}: IProps) => {
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);
    const { tourney } = useTourney();

    const editMatch = async() => {
        await new MatchService().edit(match.id, match);
        setScheduleUpdate(scheduleUpdate + 1);
        onClose();
    }

    const onWbd = async({match, winner}: MatchWbdDto) => {
        match.isDone = true;
        match.mpLink = '';
        match.score1 = winner === match.player1.name ? -1 : 0;
        match.score2 = winner === match.player2.name ? -1 : 0;

        editMatch();
    }

    const onConclude = async() => {
        match.isDone = true;
        editMatch();
    }

    return (  
        <Paper elevation={8} sx={{ padding: 1, paddingBottom: 0, marginBottom: 1 }}>
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
                <Grid item paddingTop={1}>
                    <FastField fullWidth name='match.mpLink' label='MP link' size='small' as={TextField}/>
                </Grid>
                <Divider/>
                <Grid item padding={1} paddingLeft={0}>
                    <ConfirmationDialog 
                        title='Are you sure you wish to conclude this match?' 
                        actionTitle='Conclude'
                        action={() => onConclude()}
                        btnProps={{
                            sx: { marginRight: 1 },
                            color: 'success',
                            startIcon: <Check/>
                        }}/>
                    <MatchWbdForm match={match} onWbd={onWbd}/>
                </Grid>
            </Grid>
        </Paper>
    );
}
 
export default RefMatchMain;