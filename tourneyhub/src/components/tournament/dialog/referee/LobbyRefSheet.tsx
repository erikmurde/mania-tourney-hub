import { Button, Grid } from '@mui/material';
import SectionTitle from '../../SectionTitle';
import { ChevronLeft } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { IMapDto } from '../../../../dto/map/IMapDto';
import { MapService } from '../../../../services/mapService';
import { LobbyDto } from '../../../../dto/schedule/lobby/LobbyDto';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import TeamInviteCommands from '../../ref/commands/TeamInviteCommands';
import LobbyGeneralCommands from '../../ref/lobby/LobbyGeneralCommands';
import LobbyInviteCommands from '../../ref/lobby/LobbyInviteCommands';
import LobbyMapCommands from '../../ref/lobby/LobbyMapCommands';
import LobbyMain from '../../ref/lobby/LobbyMain';
import LobbyMapPool from '../../ref/lobby/LobbyMapPool';
import { RefSheetPaper } from '../../../styled/RefSheetPaper';
import NoItems from '../../NoItems';

interface IProps {
    lobby: LobbyDto,
    stageName: string,
    lobbySize: number,
    onClose: () => void
}

const LobbyRefSheet = ({lobby, stageName, lobbySize, onClose}: IProps) => {
    const { tourney } = useTourney();

    const [maps, setMaps] = useState([] as IMapDto[]);
    const [selectedId, setSelectedId] = useState(null as number | null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        new MapService()
            .getAllInMappoolByStageId(lobby.stageId)
            .then(maps => setMaps(maps ?? []))
            .finally(() => setLoading(false));
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
                        <LobbyMain lobby={lobby} stageName={stageName} onClose={onClose}/>
                        <LobbyMapCommands selectedId={selectedId}/>
                        <LobbyGeneralCommands lobbySize={lobbySize}/>
                    </Grid>
                    <Grid item xs={7}>
                        <RefSheetPaper elevation={8} sx={{ height: 1 }}>
                            <NoItems name='maps' loading={loading} display={maps.length === 0}/>
                            {!loading &&
                            <LobbyMapPool maps={maps} selectedId={selectedId} setSelectedId={setSelectedId}/>}
                        </RefSheetPaper>
                    </Grid>
                    <Grid item xs>
                        {tourney.minTeamSize > 1 
                            ? <TeamInviteCommands teamNames={lobby.players}/> 
                            : <LobbyInviteCommands players={lobby.players}/>}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
 
export default LobbyRefSheet;