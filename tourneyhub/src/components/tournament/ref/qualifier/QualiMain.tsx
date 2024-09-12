import { Check } from '@mui/icons-material';
import { RefSheetPaper } from '../../../styled/RefSheetPaper';
import ConfirmationDialog from '../../dialog/ConfirmationDialog';
import { Divider, Grid, TextField, Typography } from '@mui/material';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import { LobbyDto } from '../../../../dto/schedule/LobbyDto';
import { useState } from 'react';

interface IProps {
    lobby: LobbyDto,
    stageName: string
}

const QualiMain = ({lobby, stageName}: IProps) => {
    const [mpLink, setMpLink] = useState('');
    const { tourney } = useTourney();

    const onConclude = () => {
        lobby.isDone = true;
        lobby.mpLink = mpLink;
        
        console.log(lobby);
    }

    const roomCommand = `!mp make ${tourney.code}: Lobby ${lobby.code}`;

    return (  
        <RefSheetPaper elevation={8} sx={{ marginBottom: 1, paddingTop: 1 }}>
            <Grid container direction='column' rowGap={1}>
                <Grid item>
                    <Typography fontWeight={500}>
                        {tourney.code} {stageName} lobby {lobby.code}
                    </Typography>
                </Grid>
                <Divider/>
                <Grid item>
                    <Typography fontSize={14}>
                        {roomCommand}
                    </Typography>
                </Grid>
                <Divider/>
                <Grid item>
                    <TextField fullWidth label='MP link' size='small' onChange={(e) => setMpLink(e.target.value)}/>
                </Grid>
                <Grid item padding={1} paddingLeft={0}>
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