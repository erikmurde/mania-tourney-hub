import { TableRow } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { LobbyDto } from '../../../../../dto/schedule/LobbyDto';
import { SchedTableCell } from '../../../../styled/SchedTableCell';
import { useContext } from 'react';
import { AuthContext } from '../../../../../routes/Root';
import { HOST, ADMIN, PLAYER, REFEREE } from '../../../../../constants';
import LobbyRowActions from './LobbyRowActions';
import { TeamDto } from '../../../../../dto/team/TeamDto';
import { useTourney } from '../../../../../routes/tournament/TournamentHeader';

interface IProps {
    lobby: LobbyDto,
    userTeam: TeamDto | null,
    lobbySize: number,
    isRegistered: boolean,
    deadlinePassed: boolean,
    refLobby: (lobby: LobbyDto) => void
}

const LobbyTableRow = ({lobby, userTeam, lobbySize, isRegistered, deadlinePassed, refLobby}: IProps) => {
    const { tourney } = useTourney();
    const { user } = useContext(AuthContext);
    dayjs.extend(utc);

    const getRights = (roles: string[]): boolean => {
        if (!user) {
            return false;
        }
        return user.roles
            .filter(tourneyRole => tourneyRole.tournamentId === tourney.id)
            .some(tourneyRole => roles.includes(tourneyRole.role));
    }

    const regName = userTeam ? userTeam.name : user?.name ?? '';
    const isHost = getRights([HOST, ADMIN]);
    const hasRefRole = getRights([REFEREE]);

    const isCaptain = user && userTeam 
        ? userTeam.players.find(player => player.id === user.id)!.isCaptain 
        : false;

    const canReg = getRights([PLAYER]) && !isRegistered && !deadlinePassed && !lobby.isDone && lobby.players.length < lobbySize && 
        !lobby.players.includes(regName) && dayjs(lobby.time) > dayjs() && isCaptain;

    return (  
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: 50 }}>
            <SchedTableCell>{lobby.code}</SchedTableCell>
            <SchedTableCell>
                {dayjs.utc(lobby.time).format('ddd, MMM DD, HH:mm')}
            </SchedTableCell>
            <SchedTableCell>{lobby.referee}</SchedTableCell>
            <SchedTableCell>
                {lobby.players.join(', ')}
            </SchedTableCell>
            <LobbyRowActions 
                lobby={lobby} 
                regName={regName}
                isHost={isHost} 
                canReg={canReg}
                hasRefRole={hasRefRole}
                onRef={() => refLobby(lobby)}
            />
        </TableRow>
    );
}

export default LobbyTableRow;