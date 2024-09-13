import { TableContainer, Table, TableBody, TableHead, TableRow, Paper, Dialog } from '@mui/material';
import { LobbyDto } from '../../../../../dto/schedule/LobbyDto';
import { SchedTableCell } from '../../../../styled/SchedTableCell';
import { IStageDto } from '../../../../../dto/stage/IStageDto';
import { useContext, useEffect, useState } from 'react';
import { AuthContext, UpdateContext } from '../../../../../routes/Root';
import { LobbyService } from '../../../../../services/lobbyService';
import LobbyTableRow from './LobbyTableRow';
import dayjs from 'dayjs';
import NoItems from '../../../NoItems';
import { TeamDto } from '../../../../../dto/team/TeamDto';
import { useTourney } from '../../../../../routes/tournament/TournamentHeader';
import { TeamService } from '../../../../../services/teamService';
import QualifierRefSheet from '../../../dialog/referee/QualifierRefSheet';

const LobbyTable = ({stage, showTeams}: {stage: IStageDto, showTeams: boolean}) => {
    const { user } = useContext(AuthContext);
    const { tourney } = useTourney();
    const { scheduleUpdate } = useContext(UpdateContext);

    const [lobbies, setLobbies] = useState([] as LobbyDto[]);
    const [userTeam, setUserTeam] = useState(null as TeamDto | null);
    const [refIndex, setRefIndex] = useState(null as number | null);    

    useEffect(() => {
        if (user?.id && tourney.minTeamSize > 1) {
            new TeamService()
                .getUserTeam(user.id, tourney.id)
                .then(team => setUserTeam(team));
        }
    }, [user?.id, tourney.minTeamSize]);

    useEffect(() => {
        new LobbyService()
            .getAllStage(stage.id)
            .then(lobbies => setLobbies(
                lobbies.sort((a, b) => dayjs(a.time) > dayjs(b.time) ? 1 : -1)
            ));
    }, [stage.id, scheduleUpdate]);

    const isRegistered = user 
        ? lobbies.some(lobby => lobby.players.includes(userTeam ? userTeam.name : user.name)) 
        : false;

    return (  
        <>
        {lobbies.length > 0 
        ?   <Paper elevation={6} sx={{ height: 1, paddingLeft: 1, paddingRight: 1 }}>
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
                                userTeam={userTeam}
                                lobbySize={stage.lobbySize} 
                                isRegistered={isRegistered}
                                deadlinePassed={dayjs(stage.schedulingDeadline) < dayjs()}
                                refLobby={(lobby) => setRefIndex(lobbies.indexOf(lobby))}/>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        :   <NoItems name='lobbies'/>}
        <Dialog fullScreen open={refIndex !== null} 
            PaperProps={{ elevation: 2, sx: { alignItems: 'center' } }}
            >
            {refIndex !== null &&
            <QualifierRefSheet
                lobby={lobbies[refIndex]}
                stageName={stage.name}
                lobbySize={stage.lobbySize}
                onClose={() => setRefIndex(null)}
            />}   
        </Dialog>
        </>
    );
}

export default LobbyTable;