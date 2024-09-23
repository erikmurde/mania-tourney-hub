import { Delete, PlayArrow } from '@mui/icons-material';
import { ADMIN, COMMENTATOR, HOST, REFEREE, STREAMER } from '../../../../../constants';
import { MatchDto } from '../../../../../dto/schedule/MatchDto';
import { SchedTableCell } from '../../../../styled/SchedTableCell';
import { StyledIconButton } from '../../../../styled/StyledIconButton';
import { useContext } from 'react';
import { AuthContext, UpdateContext } from '../../../../../routes/Root';
import ConfirmationDialog from '../../../dialog/ConfirmationDialog';
import { MatchService } from '../../../../../services/matchService';
import MatchActionMenu from './MatchActionMenu';
import { Tooltip } from '@mui/material';
import MatchEditForm from '../../form/MatchEditForm';
import { useTourney } from '../../../../../routes/tournament/TournamentHeader';
import MpLink from '../../MpLink';

interface IProps {
    match: MatchDto,
    onRef: () => void
}

const MatchRowActions = ({match, onRef}: IProps) => {
    const { tourney } = useTourney();
    const { user } = useContext(AuthContext);
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);
    const service = new MatchService();

    const getRights = (roles: string[]): boolean => {
        if (!user) {
            return false;
        }
        return user.roles
            .filter(tourneyRole => tourneyRole.tournamentId === tourney.id)
            .some(tourneyRole => roles.includes(tourneyRole.role));
    }

    const deleteMatch = async() => {
        await service.delete(match.id);
        setScheduleUpdate(scheduleUpdate + 1);
    }

    const editMatchRole = async(op: string, role: string) => {
        if (!user) {
            return;
        }
        if (op === '+') {
            match.referee = role === REFEREE ? user.name : match.referee;
            match.streamer = role === STREAMER ? user.name : match.streamer;
            match.commentators = role === COMMENTATOR ? [...match.commentators, user.name] : match.commentators;
        } else {
            match.referee = role === REFEREE ? '' : match.referee;
            match.streamer = role === STREAMER ? '' : match.streamer;
            match.commentators = role === COMMENTATOR 
                ?   match.commentators.filter(comm => comm !== user.name) 
                :   match.commentators;
        }
        await service.edit(match.id, match);
        setScheduleUpdate(scheduleUpdate + 1);
    }

    const isWbd = match.score1 < 0 || match.score2 < 0;
    const isReferee = user && match.referee === user.name;
    const isHost = getRights([HOST, ADMIN]);

    return (
        <SchedTableCell align='center'>
            {match.isDone && !isWbd && match.mpLink &&
            <MpLink title='Match link' link={match.mpLink}/>}
            {(isHost || isReferee) && !match.isDone && 
            <Tooltip title='Conduct match'>
                <StyledIconButton color='primary' onClick={onRef}>
                    <PlayArrow/>
                </StyledIconButton>
            </Tooltip>}
            {isHost && !match.isDone &&
            <>
            <MatchEditForm match={match}/>
            <ConfirmationDialog
                btnIcon={<Delete/>}
                btnProps={{ color: 'error' }}
                title='Are you sure you wish to delete this match?' 
                actionTitle='Delete' 
                action={() => deleteMatch()}/>
            </>}
            {isWbd && 'WBD'}
            <MatchActionMenu match={match} getRights={getRights} editMatchRole={editMatchRole}/>
        </SchedTableCell>
    );
}

export default MatchRowActions;