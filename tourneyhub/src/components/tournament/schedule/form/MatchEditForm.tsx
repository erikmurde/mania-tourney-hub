import { Edit } from '@mui/icons-material';
import MatchEditFormView from './views/MatchEditFormView';
import FormDialogBase from '../../dialog/FormDialogBase';
import { MatchCreateDto } from '../../../../dto/schedule/MatchCreateDto';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UpdateContext } from '../../../../routes/Root';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Schema, object, string, date, array } from 'yup';
import { HOST, ADMIN, REFEREE, STREAMER, COMMENTATOR, REQUIRED } from '../../../../constants';
import { UserDtoSimple } from '../../../../dto/user/UserDtoSimple';
import { UserDto } from '../../../../dto/user/UserDto';
import { AuthService } from '../../../../services/authService';
import { MatchDto } from '../../../../dto/schedule/MatchDto';
import { MatchService } from '../../../../services/matchService';

const MatchEditForm = ({match}: {match: MatchDto}) => {
    const { id } = useParams();
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);
    const [selectValues, setSelectValues] = useState({
        streamers: [] as UserDtoSimple[],
        commentators: [] as UserDtoSimple[],
        referees: [] as UserDtoSimple[]
    });
    const [open, setOpen] = useState(false);
    const authService = new AuthService();
    dayjs.extend(utc);

    const getUsersWithRole = (staff: UserDto[], roles: string[]) => {
        return staff
            .filter(user => user.roles.some(userRole => roles.includes(userRole.name)))
            .map(user => ({ playerId: user.playerId, name: user.name, country: user.country }));
    }

    useEffect(() => {
        if (id && open) {
            authService
                .getRoles(id, [HOST, ADMIN, REFEREE, STREAMER, COMMENTATOR])
                .then(users => setSelectValues({
                    streamers: getUsersWithRole(users, [STREAMER]),
                    commentators: getUsersWithRole(users, [COMMENTATOR]),
                    referees: getUsersWithRole(users, [HOST, ADMIN, REFEREE]),
            }));
        };
    }, [id, open]);

    const onSubmit = async(values: MatchCreateDto) => {
        const newMatch: MatchDto = {
            ...values, 
            player1: match.player1,
            player2: match.player2
        }
        await new  MatchService().edit(newMatch.id, newMatch);
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
                    initialValues={{
                        ...match,
                        player1: match.player1.name,
                        player2: match.player2.name
                    }} 
                    selectValues={selectValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}/>
            }/>
    );
}

export default MatchEditForm;