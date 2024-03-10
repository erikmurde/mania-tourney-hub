import { Delete, Edit, Link, PersonAdd, PersonRemove, PlayArrow } from '@mui/icons-material';
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
    hasRefRole: boolean
}

const LobbyRowActions = ({lobby, isHost, canReg, hasRefRole}: IProps) => {
    const { user } = useContext(AuthContext);
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);
    const service = new LobbyService();

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
    
        await service.edit(lobby.id, lobby);
        setScheduleUpdate(scheduleUpdate + 1);
    }

    const editLobbyRef = async(add: boolean) => {
        if (!user) {
            return
        }
        lobby.referee = add ? user.name : '';

        await service.edit(lobby.id, lobby);
        setScheduleUpdate(scheduleUpdate + 1);
    }

    const isReferee = user && lobby.referee === user.name;
    const canAddRef = hasRefRole && lobby.referee === '';

    return (  
        <SchedTableCell align='center'>
            {lobby.isDone && lobby.mpLink &&
            <Tooltip title='Match link'>
                <StyledIconButton 
                    onClick={() => window.open(lobby.mpLink, '_blank')}
                    sx={{ color: TERTIARY }}>
                    <Link/>
                </StyledIconButton>
            </Tooltip>}
            {(isHost || isReferee) && !lobby.isDone && 
            <Tooltip title='Conduct lobby'>
                <StyledIconButton color='primary'>
                    <PlayArrow/>
                </StyledIconButton>
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
                btnIcon={<Delete/>}
                btnProps={{ color: 'error' }}
                title='Are you sure you wish to delete this lobby?' 
                actionTitle='Delete' 
                action={() => deleteLobby()}/>
            </>}
        </SchedTableCell>
    );
}

export default LobbyRowActions;