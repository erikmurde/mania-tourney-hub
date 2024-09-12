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
import { REQUIRED } from '../../../../constants';

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
        if (match.mpLink === '') {
            setError(REQUIRED);
            return;
        }
        match.isDone = true;
        match.mpLink = mpLink;
        editMatch();
    }

    const roomCommand = `!mp make ${tourney.code}: ${match.player1.name} vs ${match.player2.name}`;

    return (  
        <RefSheetPaper elevation={8} sx={{ marginBottom: 1 }}>
            <Grid container direction='column'>
                <Grid item>
                    <Typography fontWeight={500} padding={1}>
                        {tourney.code} {stageName} match {match.code}
                    </Typography>
                </Grid>
                <Divider/>
                <Grid item>
                    <Typography fontSize={14} padding={1}>
                        {roomCommand}
                        <CopyClipboard text={roomCommand}/>
                    </Typography>
                </Grid>
                <Divider/>
                <Grid item paddingTop={1}>
                    <TextField fullWidth label='MP link' size='small' 
                        onChange={(e) => setMpLink(e.target.value)}
                        onBlur={() => setError(mpLink === '' ? REQUIRED : '')}
                        error={error !== ''}
                        helperText={error}/>
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