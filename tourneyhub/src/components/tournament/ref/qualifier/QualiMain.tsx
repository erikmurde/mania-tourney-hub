import { Check } from '@mui/icons-material';
import { RefSheetPaper } from '../../../styled/RefSheetPaper';
import ConfirmationDialog from '../../dialog/ConfirmationDialog';
import { Divider, Grid, TextField, Typography } from '@mui/material';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import { LobbyDto } from '../../../../dto/schedule/LobbyDto';
import { useContext, useState } from 'react';
import { LobbyService } from '../../../../services/lobbyService';
import { UpdateContext } from '../../../../routes/Root';
import { INVALID_URL, URL_REGEX } from '../../../../constants';
import CopyClipboard from '../CopyClipboard';

interface IProps {
    lobby: LobbyDto,
    stageName: string,
    onClose: () => void
}

const QualiMain = ({lobby, stageName, onClose}: IProps) => {
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
                <Grid item xs={12} height={50} alignContent='center'>
                    <Typography fontWeight={500}>
                        {tourney.code} {stageName} lobby {lobby.code}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
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
 
export default QualiMain;