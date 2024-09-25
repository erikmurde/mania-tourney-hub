import { Edit } from '@mui/icons-material';
import MatchEditFormView from './views/MatchEditFormView';
import FormDialogBase from '../../dialog/FormDialogBase';
import { useContext, useEffect, useState } from 'react';
import { UpdateContext } from '../../../../routes/Root';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Schema, object, string, date, array } from 'yup';
import { HOST, ADMIN, REFEREE, STREAMER, COMMENTATOR, REQUIRED } from '../../../../constants';
import { UserDtoSimple } from '../../../../dto/user/UserDtoSimple';
import { AuthService } from '../../../../services/authService';
import { MatchDto } from '../../../../dto/schedule/match/MatchDto';
import { MatchService } from '../../../../services/matchService';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import { MatchEditDto } from '../../../../dto/schedule/match/MatchEditDto';

const MatchEditForm = ({match}: {match: MatchDto}) => {
    const { tourney } = useTourney();
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);
    const [selectValues, setSelectValues] = useState({
        streamers: [] as UserDtoSimple[],
        commentators: [] as UserDtoSimple[],
        referees: [] as UserDtoSimple[]
    });
    const [open, setOpen] = useState(false);
    const authService = new AuthService();
    dayjs.extend(utc);

    useEffect(() => {
        if (open) {
            authService
                .getUsersWithRoles(tourney.id, [HOST, ADMIN, REFEREE, STREAMER, COMMENTATOR], true)
                .then(users => setSelectValues({
                    streamers: getUsersWithRole(users, [STREAMER]),
                    commentators: getUsersWithRole(users, [COMMENTATOR]),
                    referees: getUsersWithRole(users, [HOST, ADMIN, REFEREE]),
            }));
        };
    }, [tourney.id, open]);

    const getUsersWithRole = (staff: UserDtoSimple[], roles: string[]) => {
        return staff.filter(user => 
            user.roles.some(userRole => roles.includes(userRole))
        );
    }

    const onSubmit = async(values: MatchEditDto) => {
        await new  MatchService().edit(match.id, values);
        setScheduleUpdate(scheduleUpdate + 1);
        setOpen(false);
    }

    const validationSchema: Schema = object({
        code: string()
            .required(REQUIRED),
        time: date()
            .typeError('Invalid date format')
            .required(REQUIRED)
            .min(dayjs.utc(), 'Must be in the future'),
        commentators: array()
            .of(string())
            .max(2, 'Maximum 2 commentators')
    });

    const initialValues: MatchEditDto = {
        code: match.code,
        time: match.time,
        refereeId: selectValues.referees
            .find(r => r.name === match.referee)?.id ?? '',

        streamerId: selectValues.streamers
            .find(s => s.name === match.streamer)?.id ?? '',

        commentatorIds: selectValues.commentators
            .filter(c => match.commentators.includes(c.name))
            .map(c => c.id)
    }

    return (  
        <FormDialogBase 
            title={'Edit match'} 
            formName={'match-edit-form'} 
            btnIcon={<Edit/>}
            btnProps={{ color: 'primary' }} 
            submitActionName={'Edit'}
            open={open} 
            setOpen={setOpen}
            form={
                <MatchEditFormView 
                    initialValues={initialValues} 
                    selectValues={selectValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}/>
            }/>
    );
}

export default MatchEditForm;