import { TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { LobbyDto } from '../../../../../dto/schedule/LobbyDto';
import { SchedTableCell } from '../../../../styled/SchedTableCell';
import { useContext } from 'react';
import { AuthContext } from '../../../../../routes/Root';
import { HOST, ADMIN, PLAYER, REFEREE } from '../../../../../constants';
import { useParams } from 'react-router-dom';
import LobbyRowActions from './LobbyRowActions';

interface IProps {
    lobby: LobbyDto,
    lobbySize: number,
    isRegistered: boolean,
    deadlinePassed: boolean
}

const LobbyTableRow = ({lobby, lobbySize, isRegistered, deadlinePassed}: IProps) => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const getRights = (roles: string[]): boolean => {
        if (!user) {
            return false;
        }
        return user.roles
            .filter(role => role.tournamentId === id)
            .some(role => roles.includes(role.name))
    }

    const isHost = getRights([HOST, ADMIN]);
    const hasRefRole = getRights([REFEREE]);
    const canReg = getRights([PLAYER]) && !deadlinePassed && !lobby.isDone && lobby.players.length < lobbySize && !isRegistered;

    return (  
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: 50 }}>
            <SchedTableCell>{lobby.code}</SchedTableCell>
            <SchedTableCell>
                {dayjs(lobby.time).format('ddd, MMM DD, HH:mm')}
            </SchedTableCell>
            <SchedTableCell>{lobby.referee}</SchedTableCell>
            <SchedTableCell>
                {lobby.players.join(', ')}
            </SchedTableCell>
            <LobbyRowActions 
                lobby={lobby} 
                isHost={isHost} 
                canReg={canReg}
                hasRefRole={hasRefRole}
            />
        </TableRow>
    );
}

export default LobbyTableRow;