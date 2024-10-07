import { Delete, PlayArrow } from '@mui/icons-material';
import { ADMIN, HOST } from '../../../../../constants';
import { MatchDto } from '../../../../../dto/schedule/match/MatchDto';
import { SchedTableCell } from '../../../../styled/SchedTableCell';
import { StyledIconButton } from '../../../../styled/StyledIconButton';
import { useContext } from 'react';
import { AuthContext, ErrorContext, UpdateContext } from '../../../../../routes/Root';
import ConfirmationDialog from '../../../dialog/ConfirmationDialog';
import { MatchService } from '../../../../../services/matchService';
import MatchActionMenu from './MatchActionMenu';
import { Tooltip } from '@mui/material';
import MatchEditForm from '../../form/MatchEditForm';
import { useTourney } from '../../../../../routes/tournament/TournamentHeader';
import MpLink from '../../MpLink';
import { AuthService } from '../../../../../services/authService';

interface IProps {
    match: MatchDto,
    onRef: () => void
}

const MatchRowActions = ({match, onRef}: IProps) => {
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);
    const { setError } = useContext(ErrorContext);
    const { tourney } = useTourney();
    const { user } = useContext(AuthContext);
    const service = new MatchService();

    if (!user) {
        return <></>;
    }

    const deleteMatch = async() => {
        const error = await service.delete(match.id);

        if (error) {
            return setError(error);
        }
        setScheduleUpdate(scheduleUpdate + 1);
    }

    const editMatchRole = async(add: boolean, role: string) => {
        let error;

        if (add) {
            error = await service.registerStaff(match.id, user.id, role);
        } else {
            error = await service.unregisterStaff(match.id, user.id, role);
        }
        if (error) {
            setError(error);
        } else {
            setScheduleUpdate(scheduleUpdate + 1);
        }
    }

    const isWbd = match.score1 < 0 || match.score2 < 0;
    const isReferee = match.referee === user.name;
    const hasEditRights = new AuthService().hasRoles(user, tourney.id, HOST, ADMIN);

    return (
        <SchedTableCell align='center'>
            {match.concluded && !isWbd && match.matchId &&
            <MpLink title='Match link' matchId={match.matchId}/>}
            {(hasEditRights || isReferee) && !match.concluded && 
            <Tooltip title='Conduct match'>
                <StyledIconButton color='primary' onClick={onRef}>
                    <PlayArrow/>
                </StyledIconButton>
            </Tooltip>}
            {hasEditRights && !match.concluded &&
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
            <MatchActionMenu match={match} tourneyId={tourney.id} editMatchRole={editMatchRole}/>
        </SchedTableCell>
    );
}

export default MatchRowActions;