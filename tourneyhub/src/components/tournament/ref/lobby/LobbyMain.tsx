import { Check } from '@mui/icons-material';
import { RefSheetPaper } from '../../../styled/RefSheetPaper';
import ConfirmationDialog from '../../dialog/ConfirmationDialog';
import { Grid, TextField } from '@mui/material';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import { LobbyDto } from '../../../../dto/schedule/lobby/LobbyDto';
import { useContext, useState } from 'react';
import { ErrorContext, UpdateContext } from '../../../../routes/Root';
import { LOGIN_URL, NOT_NEGATIVE, TOO_LARGE } from '../../../../constants';
import RoomTitle from '../RoomTitle';
import { LobbyService } from '../../../../services/lobbyService';

interface IProps {
    lobby: LobbyDto,
    stageName: string,
    onClose: () => void
}

const LobbyMain = ({lobby, stageName, onClose}: IProps) => {
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);
    const { setError } = useContext(ErrorContext);
    const { tourney } = useTourney();
    const [matchId, setMatchId] = useState(null as number | null);
    const [validationError, setValidationError] = useState('');

    const onConclude = async() => {
        if (!validate()) {
            return;
        }
        setValidationError('');
        const error = await new LobbyService().edit(lobby.id, {
            referee: lobby.referee,
            matchId: matchId,
            time: lobby.time,
            concluded: true
        });
        if (error) {
            if (error.statusCode === 401) {
                return window.location.assign(LOGIN_URL);
            }
            return setError(error);
        }
        setScheduleUpdate(scheduleUpdate + 1);
        onClose();
    }

    const validate = () => {
        if (!matchId || matchId < 0) {
            setValidationError(NOT_NEGATIVE);
        } else if (matchId > 1000000000) {
            setValidationError(TOO_LARGE);
        } else {
            return true;
        }
        return false;
    }

    const roomCommand = `!mp make ${tourney.code}: Lobby ${lobby.code}`;

    return (  
        <RefSheetPaper elevation={8} sx={{ marginBottom: 1 }}>
            <Grid container alignItems='center'>
                <RoomTitle 
                    roomTitle={`${tourney.code} ${stageName} lobby ${lobby.code}`} 
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
                        title='Are you sure you wish to conclude this lobby?' 
                        actionTitle='Conclude'
                        action={() => onConclude()}
                        btnProps={{
                            color: 'success',
                            startIcon: <Check/>
                        }}/>
                </Grid>
            </Grid>
        </RefSheetPaper>
    );
}
 
export default LobbyMain;