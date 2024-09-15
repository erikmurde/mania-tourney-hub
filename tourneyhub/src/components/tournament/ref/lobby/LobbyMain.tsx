import { Check } from '@mui/icons-material';
import { RefSheetPaper } from '../../../styled/RefSheetPaper';
import ConfirmationDialog from '../../dialog/ConfirmationDialog';
import { Grid, TextField } from '@mui/material';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import { LobbyDto } from '../../../../dto/schedule/LobbyDto';
import { useContext, useState } from 'react';
import { LobbyService } from '../../../../services/lobbyService';
import { UpdateContext } from '../../../../routes/Root';
import { INVALID_URL, URL_REGEX } from '../../../../constants';
import RoomTitle from '../RoomTitle';

interface IProps {
    lobby: LobbyDto,
    stageName: string,
    onClose: () => void
}

const LobbyMain = ({lobby, stageName, onClose}: IProps) => {
    const { tourney } = useTourney();
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);
    const [mpLink, setMpLink] = useState('');
    const [error, setError] = useState('');

    const onConclude = async() => {
        if (!mpLink.match(URL_REGEX)) {
            setError(INVALID_URL);
            return;
        }
        lobby.isDone = true;
        lobby.mpLink = mpLink;
        
        await new LobbyService().edit(lobby.id, lobby);
        setScheduleUpdate(scheduleUpdate + 1);
        onClose();
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
                    <TextField fullWidth label='MP link' size='small' 
                        onChange={(e) => setMpLink(e.target.value)}
                        onBlur={() => setError(!mpLink.match(URL_REGEX) ? INVALID_URL : '')}
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