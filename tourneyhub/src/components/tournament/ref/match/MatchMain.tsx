import { Grid, TextField } from '@mui/material';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import { MatchDto } from '../../../../dto/schedule/match/MatchDto';
import { Check } from '@mui/icons-material';
import MatchWbdForm from './form/MatchWbdForm';
import { useContext, useState } from 'react';
import { UpdateContext } from '../../../../routes/Root';
import { MatchService } from '../../../../services/matchService';
import ConfirmationDialog from '../../dialog/ConfirmationDialog';
import { RefSheetPaper } from '../../../styled/RefSheetPaper';
import { NOT_NEGATIVE } from '../../../../constants';
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
    const { tourney } = useTourney();
    const [matchId, setMatchId] = useState(null as number | null);
    const [error, setError] = useState('');

    const editMatch = async(matchId: number | null, score1: number, score2: number) => {
        await new MatchService().conclude(match.id, matchId, score1, score2);
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
            setError(NOT_NEGATIVE);
            return;
        }
        await editMatch(matchId, match.score1, match.score2);
    }

    const roomCommand = `!mp make ${tourney.code}: ${match.player1.name} vs ${match.player2.name}`;

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
                        onBlur={() => setError(matchId && matchId > 0 ? '' : NOT_NEGATIVE)}
                        error={error !== ''}
                        helperText={error}/>
                </Grid>
                <Grid item marginTop={1} marginBottom={1} paddingLeft={0.5}>
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
 
export default MatchMain;