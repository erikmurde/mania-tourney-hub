import { Delete, Link, PersonAdd, PersonRemove, PlayArrow } from '@mui/icons-material';
import { TERTIARY } from '../../../../../constants';
import { SchedTableCell } from '../../../../styled/SchedTableCell';
import { StyledIconButton } from '../../../../styled/StyledIconButton';
import ConfirmationDialog from '../../../dialog/ConfirmationDialog';
import { LobbyDto } from '../../../../../dto/schedule/LobbyDto';
import { LobbyService } from '../../../../../services/lobbyService';
import { useContext } from 'react';
import { AuthContext, UpdateContext } from '../../../../../routes/Root';
import { Tooltip } from '@mui/material';
import LobbyEditForm from '../../form/LobbyEditForm';

interface IProps {
    lobby: LobbyDto,
    isHost: boolean,
    canReg: boolean,
    hasRefRole: boolean,
    onRef: () => void
}

const LobbyRowActions = ({lobby, isHost, canReg, hasRefRole, onRef}: IProps) => {
    const { user } = useContext(AuthContext);
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);
    const service = new LobbyService();

    const editLobby = async() => {
        await service.edit(lobby.id, lobby);
        setScheduleUpdate(scheduleUpdate + 1);
    }

    const deleteLobby = async() => {
        await service.delete(lobby.id);
        setScheduleUpdate(scheduleUpdate + 1);
    }

    const editLobbyReg = async(reg: boolean) => {
        if (!user) {
            return;
        }
        lobby.players = reg 
            ? [...lobby.players, user.name] 
            : lobby.players.filter(player => player !== user.name);
    
        editLobby();
    }

    const editLobbyRef = (add: boolean) => {
        if (!user) {
            return
        }
        lobby.referee = add ? user.name : '';
        editLobby();
    }

    const closeEmptyLobby = () => {
        lobby.isDone = true;
        editLobby();
    }

    const isReferee = user && lobby.referee === user.name;
    const canAddRef = hasRefRole && lobby.referee === '';

    return (  
        <SchedTableCell align='center'>
            {lobby.isDone && lobby.mpLink &&
            <Tooltip title='Lobby link'>
                <StyledIconButton 
                    onClick={() => window.open(lobby.mpLink, '_blank')}
                    sx={{ color: TERTIARY }}>
                    <Link/>
                </StyledIconButton>
            </Tooltip>}
            {(isHost || isReferee) && !lobby.isDone && 
            <Tooltip title='Conduct lobby'>
                {lobby.players.length > 0 
                ?   <StyledIconButton color='primary' onClick={onRef}>
                        <PlayArrow/>
                    </StyledIconButton>
                :   <span>
                        <ConfirmationDialog
                            size='xs'
                            title='This lobby has no registered players. Do you wish to close it?'
                            actionTitle='Yes'
                            action={closeEmptyLobby}
                            btnIcon={<PlayArrow/>}
                            btnProps={{ color: 'primary' }}/>
                    </span>}
            </Tooltip>}
            {!isHost && (canReg || canAddRef) && !lobby.isDone &&
            <Tooltip title={hasRefRole ? 'Set as referee' : 'Register for lobby'}>
                <StyledIconButton 
                    color='success' 
                    onClick={() => hasRefRole ? editLobbyRef(true) : editLobbyReg(true)}
                    >
                    <PersonAdd/>
                </StyledIconButton>
            </Tooltip>}
            {user && (isReferee || lobby.players.includes(user.name)) &&
            <Tooltip title={hasRefRole ? 'Remove referee' : 'Cancel registration'}>
                <StyledIconButton 
                    color='error' 
                    onClick={() => hasRefRole ? editLobbyRef(false) : editLobbyReg(false)}
                    >
                    <PersonRemove/>
                </StyledIconButton>
            </Tooltip>}
            {isHost && !lobby.isDone &&
            <>
            <LobbyEditForm lobby={lobby}/>
            <ConfirmationDialog
                title='Are you sure you wish to delete this lobby?' 
                actionTitle='Delete' 
                action={() => deleteLobby()}
                btnIcon={<Delete/>}
                btnProps={{ color: 'error' }}/>
            </>}
        </SchedTableCell>
    );
}

export default LobbyRowActions;