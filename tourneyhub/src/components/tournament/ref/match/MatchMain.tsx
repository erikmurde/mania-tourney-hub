import { Grid, TextField } from '@mui/material';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import { MatchDto } from '../../../../dto/schedule/match/MatchDto';
import { Check } from '@mui/icons-material';
import MatchWbdForm from './form/MatchWbdForm';
import { useContext, useState } from 'react';
import { ErrorContext, UpdateContext } from '../../../../routes/Root';
import { MatchService } from '../../../../services/matchService';
import ConfirmationDialog from '../../dialog/ConfirmationDialog';
import { RefSheetPaper } from '../../../styled/RefSheetPaper';
import { LOGIN_URL, NOT_NEGATIVE, TOO_LARGE } from '../../../../constants';
import RoomTitle from '../RoomTitle';
import { MatchWbdDto } from '../../../../dto/ref/MatchWbdDto';

interface IProps {
    match: MatchDto,
    stageName: string,
    maxScore: number,
    onClose: () => void
}

const MatchMain = ({match, stageName, maxScore, onClose}: IProps) => {
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);
    const { setError } = useContext(ErrorContext);
    const { tourney } = useTourney();
    const [matchId, setMatchId] = useState(null as number | null);
    const [validationError, setValidationError] = useState('');

    const editMatch = async(matchId: number | null, score1: number, score2: number) => {
        setValidationError('');
        const error = await new MatchService().conclude(match.id, matchId, score1, score2);

        if (error) {
            if (error.statusCode === 401) {
                return window.location.assign(LOGIN_URL);
            }
            return setError(error);
        }
        setScheduleUpdate(scheduleUpdate + 1);
        onClose();
    }

    const onWbd = async({match, winner}: MatchWbdDto) => {
        const score1 = winner === match.player1.name ? -1 : 0;
        const score2 = winner === match.player2.name ? -1 : 0;

        await editMatch(null, score1, score2);
    }

    const onConclude = async() => {
        if (!matchId || matchId < 0) {
            setValidationError(NOT_NEGATIVE);
        } else if (matchId > 1000000000) {
            setValidationError(TOO_LARGE);
        } else {
            await editMatch(matchId, match.score1, match.score2);
        }
    }

    const roomCommand = `!mp make ${tourney.code}: ${match.player1.name} vs ${match.player2.name}`;
    const disabled = match.score1 < maxScore && match.score2 < maxScore;

    return (  
        <RefSheetPaper elevation={8} sx={{ marginBottom: 1 }}>
            <Grid container alignItems='center'>
                <RoomTitle 
                    roomTitle={`${tourney.code} ${stageName} match ${match.code}`} 
                    roomCommand={roomCommand}
                />
                <Grid item xs={12} marginTop={0.5} marginBottom={1} paddingLeft={0.5}>
                    <TextField fullWidth type='number' label='osu! match ID' size='small' 
                        onChange={(e) => setMatchId(Number(e.target.value))}
                        error={validationError !== ''}
                        helperText={validationError}/>
                </Grid>
                <Grid item marginTop={1} marginBottom={1} paddingLeft={0.5}>
                    <ConfirmationDialog 
                        title='Are you sure you wish to conclude this match?' 
                        actionTitle='Conclude'
                        tooltip={disabled ? 'Match needs a winner' : ''}
                        action={() => onConclude()}
                        btnProps={{
                            sx: { marginRight: 1 },
                            color: 'success',
                            startIcon: <Check/>,
                            disabled: disabled
                        }}/>
                    <MatchWbdForm match={match} onWbd={onWbd}/>
                </Grid>
            </Grid>
        </RefSheetPaper>
    );
}
 
export default MatchMain;