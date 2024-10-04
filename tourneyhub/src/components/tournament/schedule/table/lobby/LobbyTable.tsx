import { TableContainer, Table, TableBody, TableHead, TableRow, Paper, Dialog } from '@mui/material';
import { LobbyDto } from '../../../../../dto/schedule/lobby/LobbyDto';
import { SchedTableCell } from '../../../../styled/SchedTableCell';
import { IStageDto } from '../../../../../dto/stage/IStageDto';
import { useContext, useEffect, useState } from 'react';
import { AuthContext, UpdateContext } from '../../../../../routes/Root';
import { LobbyService } from '../../../../../services/lobbyService';
import LobbyTableRow from './LobbyTableRow';
import dayjs from 'dayjs';
import NoItems from '../../../NoItems';
import { useTourney } from '../../../../../routes/tournament/TournamentHeader';
import LobbyRefSheet from '../../../dialog/referee/LobbyRefSheet';

interface IProps {
    stage: IStageDto,
    canView: boolean,
    showTeams: boolean
}

const LobbyTable = ({stage, canView, showTeams}: IProps) => {
    const { user } = useContext(AuthContext);
    const { tourney } = useTourney();
    const { scheduleUpdate } = useContext(UpdateContext);

    const [lobbies, setLobbies] = useState([] as LobbyDto[]);
    const [teamName, setTeamName] = useState(null as string | null);
    const [refIndex, setRefIndex] = useState(null as number | null);    
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setTeamName(
            user?.stats.find(stats => stats.tournamentId === tourney.id)?.team ?? null
        );
    }, [user?.stats, tourney.id]);

    useEffect(() => {
        new LobbyService()
        .getAllByStageId(stage.id)
        .then(lobbies => setLobbies(
            lobbies.sort((a, b) => dayjs(a.time) > dayjs(b.time) ? 1 : -1)
        ))
        .finally(() => setLoading(false));
    }, [stage.id, scheduleUpdate]);

    const isRegistered = user 
        ? lobbies.some(lobby => lobby.players.includes(teamName ?? user.name)) 
        : false;

    return (  
        <>
        {!loading && lobbies.length > 0 &&
        <Paper elevation={6} sx={{ height: 1, paddingLeft: 1, paddingRight: 1 }}>
            <TableContainer>
                <Table>
                    <TableHead sx={{ height: 50 }}>
                        <TableRow>
                            <SchedTableCell width={65}>Lobby ID</SchedTableCell>
                            <SchedTableCell width={140}>Lobby Time (UTC)</SchedTableCell>
                            <SchedTableCell width={160}>Referee</SchedTableCell>
                            <SchedTableCell>{showTeams ? 'Teams' : 'Players'}</SchedTableCell>
                            <SchedTableCell align='center' width={110}>Actions</SchedTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lobbies.map(lobby =>
                        <LobbyTableRow 
                            key={lobby.id} 
                            lobby={lobby} 
                            teamName={teamName}
                            lobbySize={stage.lobbySize} 
                            isRegistered={isRegistered}
                            deadlinePassed={dayjs(stage.schedulingDeadline) < dayjs()}
                            refLobby={(lobby) => setRefIndex(lobbies.indexOf(lobby))}/>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>}
        <NoItems name='lobbies' loading={loading} display={!canView || lobbies.length === 0}/>
        {refIndex !== null &&
        <Dialog fullScreen 
            open={refIndex !== null} 
            PaperProps={{ elevation: 2, sx: { alignItems: 'center' } }}
            >
            {refIndex !== null &&
            <LobbyRefSheet
                lobby={lobbies[refIndex]}
                stageName={stage.name}
                lobbySize={stage.lobbySize}
                onClose={() => setRefIndex(null)}
            />}   
        </Dialog>}
        </>
    );
}

export default LobbyTable;