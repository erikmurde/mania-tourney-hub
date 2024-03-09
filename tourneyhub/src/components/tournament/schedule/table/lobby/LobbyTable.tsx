import { TableContainer, Table, TableBody, TableHead } from '@mui/material';
import { LobbyDto } from '../../../../../dto/schedule/LobbyDto';
import { SchedTableCell } from '../../../../styled/SchedTableCell';
import { IStageDto } from '../../../../../dto/stage/IStageDto';
import { useContext, useEffect, useState } from 'react';
import { AuthContext, UpdateContext } from '../../../../../routes/Root';
import { LobbyService } from '../../../../../services/lobbyService';
import LobbyTableRow from './LobbyTableRow';
import dayjs from 'dayjs';

const LobbyTable = ({stage}: {stage: IStageDto}) => {
    const { user } = useContext(AuthContext); 
    const { scheduleUpdate } = useContext(UpdateContext);
    const [lobbies, setLobbies] = useState([] as LobbyDto[]);

    useEffect(() => {
        new LobbyService()
            .getAllStage(stage.id)
            .then(lobbies => setLobbies(
                lobbies.sort((a, b) => a.time > b.time ? 1 : -1)
            ));
    }, [stage.id, scheduleUpdate]);

    const isRegistered = user 
        ?   lobbies.some(lobby => lobby.players.includes(user.name)) 
        :   false;

    const deadlinePassed = dayjs(stage.schedulingDeadline) < dayjs();

    return (  
        <TableContainer>
            <Table>
                <TableHead sx={{ height: 50 }}>
                    <SchedTableCell width={65}>Lobby ID</SchedTableCell>
                    <SchedTableCell width={140}>Lobby Time (UTC)</SchedTableCell>
                    <SchedTableCell width={160}>Referee</SchedTableCell>
                    <SchedTableCell>Players</SchedTableCell>
                    <SchedTableCell align='center' width={110}>Actions</SchedTableCell>
                </TableHead>
                <TableBody>
                    {lobbies.map(lobby =>
                       <LobbyTableRow 
                            key={lobby.id} 
                            lobby={lobby} 
                            lobbySize={stage.lobbySize} 
                            isRegistered={isRegistered}
                            deadlinePassed={deadlinePassed}/>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
 
export default LobbyTable;