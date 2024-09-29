import { Delete, PersonAdd, PersonRemove, PlayArrow } from '@mui/icons-material';
import { SchedTableCell } from '../../../../styled/SchedTableCell';
import { StyledIconButton } from '../../../../styled/StyledIconButton';
import ConfirmationDialog from '../../../dialog/ConfirmationDialog';
import { LobbyDto } from '../../../../../dto/schedule/lobby/LobbyDto';
import { LobbyService } from '../../../../../services/lobbyService';
import { useContext } from 'react';
import { AuthContext, UpdateContext } from '../../../../../routes/Root';
import { Tooltip } from '@mui/material';
import LobbyEditForm from '../../form/LobbyEditForm';
import MpLink from '../../MpLink';
import { LobbyRegisterDto } from '../../../../../dto/schedule/lobby/LobbyRegisterDto';

interface IProps {
    lobby: LobbyDto,
    teamName: string | null,
    canReg: boolean,
    isHost: boolean,
    hasRefRole: boolean,
    onRef: () => void
}

const LobbyRowActions = ({lobby, teamName, isHost, canReg, hasRefRole, onRef}: IProps) => {
    const { user } = useContext(AuthContext);
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);
    const service = new LobbyService();

    const editLobby = async(participant: string, referee: boolean, reg: boolean) => {
        const data: LobbyRegisterDto = {
            participant: participant,
            referee: referee,
            team: teamName !== null && !referee
        }
        if (reg) {
            await service.registerParticipant(lobby.id, data);
        } else {
            await service.unregisterParticipant(lobby.id, data);
        }
        setScheduleUpdate(scheduleUpdate + 1);
    }

    const deleteLobby = async() => {
        await service.delete(lobby.id);
        setScheduleUpdate(scheduleUpdate + 1);
    }

    const editLobbyPlayer = async(reg: boolean) => {
        if (user) {
            editLobby(teamName ?? user.name, false, reg);
        }
    }

    const editLobbyRef = (reg: boolean) => {
        if (user) {
            editLobby(user.name, true, reg);
        }
    }

    const closeEmptyLobby = async() => {
        await service.edit(lobby.id, {
            referee: lobby.referee,
            matchId: null,
            time: lobby.time,
            concluded: true
        });
        setScheduleUpdate(scheduleUpdate + 1);
    }

    const isReferee = lobby.referee === user?.name;
    const canAddRef = hasRefRole && !lobby.referee;

    return (  
        <SchedTableCell align='center'>
            {lobby.concluded && lobby.matchId && 
            <MpLink title='Lobby link' matchId={lobby.matchId}/>}
            {(isHost || isReferee) && !lobby.concluded && 
            <>
            {lobby.players.length > 0 
            ?   <Tooltip title='Conduct lobby'>
                    <StyledIconButton color='primary' onClick={onRef}>
                        <PlayArrow/>
                    </StyledIconButton>
                </Tooltip>
            :   <ConfirmationDialog
                    size='xs'
                    title='This lobby has no registered players. Do you wish to close it?'
                    actionTitle='Yes'
                    tooltip='Conduct lobby'
                    action={closeEmptyLobby}
                    btnIcon={<PlayArrow/>}
                    btnProps={{ color: 'primary' }}
                />}
            </>}
            {!isHost && (canReg || canAddRef) && !lobby.concluded &&
            <Tooltip title={hasRefRole ? 'Set as referee' : 'Register for lobby'}>
                <StyledIconButton 
                    color='success' 
                    onClick={() => hasRefRole ? editLobbyRef(true) : editLobbyPlayer(true)}
                    >
                    <PersonAdd/>
                </StyledIconButton>
            </Tooltip>}
            {user && !isHost && !lobby.concluded && (isReferee || lobby.players.includes(teamName ?? user.name)) &&
            <Tooltip title={hasRefRole ? 'Remove referee' : 'Cancel registration'}>
                <StyledIconButton 
                    color='error' 
                    onClick={() => hasRefRole ? editLobbyRef(false) : editLobbyPlayer(false)}
                    >
                    <PersonRemove/>
                </StyledIconButton>
            </Tooltip>}
            {isHost && !lobby.concluded &&
            <>
            <LobbyEditForm lobby={lobby}/>
            <ConfirmationDialog
                title='Are you sure you wish to delete this lobby?' 
                actionTitle='Delete' 
                action={deleteLobby}
                btnIcon={<Delete/>}
                btnProps={{ color: 'error' }}/>
            </>}
        </SchedTableCell>
    );
}

export default LobbyRowActions;