import { TableRow } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { LobbyDto } from '../../../../../dto/schedule/lobby/LobbyDto';
import { SchedTableCell } from '../../../../styled/SchedTableCell';
import { useContext } from 'react';
import { AuthContext } from '../../../../../routes/Root';
import { HOST, ADMIN, PLAYER, REFEREE } from '../../../../../constants';
import LobbyRowActions from './LobbyRowActions';
import { useTourney } from '../../../../../routes/tournament/TournamentHeader';

interface IProps {
    lobby: LobbyDto,
    teamName: string | null,
    lobbySize: number,
    isRegistered: boolean,
    deadlinePassed: boolean,
    refLobby: (lobby: LobbyDto) => void
}

const LobbyTableRow = ({lobby, teamName, lobbySize, isRegistered, deadlinePassed, refLobby}: IProps) => {
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

    const isHost = getRights([HOST, ADMIN]);
    const hasRefRole = getRights([REFEREE]);

    const isCaptain = user && teamName 
        ? user.stats.some(stats => stats.team === teamName && stats.teamCaptain)
        : false;

    const canReg = getRights([PLAYER]) && !isRegistered && !deadlinePassed && !lobby.concluded && lobby.players.length < lobbySize && 
        user !== null && !lobby.players.includes(teamName ?? user.name) && (!teamName || isCaptain);

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
                teamName={teamName}
                isHost={isHost} 
                canReg={canReg}
                hasRefRole={hasRefRole}
                onRef={() => refLobby(lobby)}
            />
        </TableRow>
    );
}

export default LobbyTableRow;