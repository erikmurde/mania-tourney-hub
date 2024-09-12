import { Button, Grid } from '@mui/material';
import SectionTitle from '../../SectionTitle';
import { ChevronLeft } from '@mui/icons-material';
import QualiMapPool from '../../ref/qualifier/QualiMapPool';
import { useEffect, useState } from 'react';
import { IMapDto } from '../../../../dto/map/IMapDto';
import { MapService } from '../../../../services/mapService';
import QualiInviteCommands from '../../ref/qualifier/QualiInviteCommands';
import QualiMapCommands from '../../ref/qualifier/QualiMapCommands';
import QualiGeneralCommands from '../../ref/qualifier/QualiGeneralCommands';
import QualiMain from '../../ref/qualifier/QualiMain';
import { LobbyDto } from '../../../../dto/schedule/LobbyDto';

interface IProps {
    lobby: LobbyDto,
    stageName: string,
    lobbySize: number,
    onClose: () => void
}

const RefSheetQualiSolo = ({lobby, stageName, lobbySize, onClose}: IProps) => {
    const [maps, setMaps] = useState([] as IMapDto[]);
    const [selectedId, setSelectedId] = useState('');

    useEffect(() => {
        new MapService()
            .getAllStageInMappool(lobby.stageId)
            .then(maps => setMaps(maps));
    }, [lobby.stageId]);

    return (  
        <Grid container alignItems='center' justifyContent='center' maxWidth={1400} marginBottom={2}>
            <SectionTitle xsAuto title='Conduct lobby'/>
            <Grid item xs textAlign='end' paddingRight={5}>
                <Button variant='contained' 
                    startIcon={<ChevronLeft/>} 
                    sx={{ width: 100 }} 
                    onClick={onClose}>
                    Back
                </Button>
            </Grid>
            <Grid item maxWidth={1200}>
                <Grid container justifyContent='center' spacing={1}>
                    <Grid item xs={5}>
                        <QualiMain lobby={lobby} stageName={stageName} onClose={onClose}/>
                        <QualiMapCommands selectedId={selectedId}/>
                        <QualiGeneralCommands lobbySize={lobbySize}/>
                    </Grid>
                    <Grid item xs={7}>
                        <QualiMapPool maps={maps} selectedId={selectedId} setSelectedId={setSelectedId}/>
                    </Grid>
                    <Grid item xs>
                        <QualiInviteCommands players={lobby.players}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
 
export default RefSheetQualiSolo;