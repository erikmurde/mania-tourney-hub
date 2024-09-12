import { Divider, Grid, TextField, Typography } from '@mui/material';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import { MatchDto } from '../../../../dto/schedule/MatchDto';
import { Check } from '@mui/icons-material';
import MatchWbdForm from './form/MatchWbdForm';
import { MatchWbdDto } from '../../../../dto/ref/MatchWbdDto';
import { useContext, useState } from 'react';
import { UpdateContext } from '../../../../routes/Root';
import { MatchService } from '../../../../services/matchService';
import ConfirmationDialog from '../../dialog/ConfirmationDialog';
import { RefSheetPaper } from '../../../styled/RefSheetPaper';
import CopyClipboard from '../CopyClipboard';
import { INVALID_URL, URL_REGEX } from '../../../../constants';

interface IProps {
    match: MatchDto,
    stageName: string,
    maxScore: number,
    onClose: () => void
}

const RefMatchMain = ({match, stageName, maxScore, onClose}: IProps) => {
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);
    const { tourney } = useTourney();
    const [mpLink, setMpLink] = useState('');
    const [error, setError] = useState('');

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
        if (!mpLink.match(URL_REGEX)) {
            setError(INVALID_URL);
            return;
        }
        match.isDone = true;
        match.mpLink = mpLink;
        editMatch();
    }

    const roomCommand = `!mp make ${tourney.code}: ${match.player1.name} vs ${match.player2.name}`;

    return (  
        <RefSheetPaper elevation={8} sx={{ marginBottom: 1 }}>
            <Grid container alignItems='center'>
                <Grid item xs={12} height={50} alignContent='center'>
                    <Typography fontWeight={500}>
                        {tourney.code} {stageName} match {match.code}
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Divider/>
                </Grid>
                <Grid item xs={11} height={50} alignContent='center'>
                    <Typography fontSize={14}>
                        {roomCommand}
                    </Typography>
                </Grid>
                <Grid item xs textAlign='end'>
                    <CopyClipboard text={roomCommand}/>
                </Grid>
                <Grid item xs={12} marginTop={0.5} marginBottom={1}>
                    <TextField fullWidth label='MP link' size='small' 
                        onChange={(e) => setMpLink(e.target.value)}
                        onBlur={() => setError(!mpLink.match(URL_REGEX) ? INVALID_URL : '')}
                        error={error !== ''}
                        helperText={error}/>
                </Grid>
                <Grid item marginTop={1} marginBottom={1} paddingLeft={0}>
                    <ConfirmationDialog 
                        title='Are you sure you wish to conclude this match?' 
                        actionTitle='Conclude'
                        action={() => onConclude()}
                        btnProps={{
                            sx: { marginRight: 1 },
                            color: 'success',
                            startIcon: <Check/>,
                            disabled: match.score1 < maxScore && match.score2 < maxScore
                        }}/>
                    <MatchWbdForm match={match} onWbd={onWbd}/>
                </Grid>
            </Grid>
        </RefSheetPaper>
    );
}
 
export default RefMatchMain;