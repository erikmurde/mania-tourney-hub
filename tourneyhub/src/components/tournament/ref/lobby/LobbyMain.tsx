import { Check } from '@mui/icons-material';
import { RefSheetPaper } from '../../../styled/RefSheetPaper';
import ConfirmationDialog from '../../dialog/ConfirmationDialog';
import { Grid, TextField } from '@mui/material';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import { LobbyDto } from '../../../../dto/schedule/lobby/LobbyDto';
import { useContext, useState } from 'react';
import { UpdateContext } from '../../../../routes/Root';
import { NOT_NEGATIVE } from '../../../../constants';
import RoomTitle from '../RoomTitle';
import { LobbyService } from '../../../../services/lobbyService';

interface IProps {
    lobby: LobbyDto,
    stageName: string,
    onClose: () => void
}

const LobbyMain = ({lobby, stageName, onClose}: IProps) => {
    const { tourney } = useTourney();
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);
    const [matchId, setMatchId] = useState(null as number | null);
    const [error, setError] = useState('');

    const onConclude = async() => {
        if (!validate()) {
            return;
        }
        await new LobbyService().edit(lobby.id, {
            referee: lobby.referee,
            matchId: matchId,
            time: lobby.time,
            concluded: true
        });
        setScheduleUpdate(scheduleUpdate + 1);
        onClose();
    }

    const validate = () => {
        let message = '';

        if (!matchId || matchId < 0) {
            message = NOT_NEGATIVE;
        }
        setError(message);
        return message === '';
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
                        onBlur={validate}
                        error={error !== ''}
                        helperText={error}/>
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