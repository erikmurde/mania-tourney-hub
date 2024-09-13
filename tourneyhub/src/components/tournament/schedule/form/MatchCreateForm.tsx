import { PlaylistAdd } from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UpdateContext } from '../../../../routes/Root';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import { ADMIN, COMMENTATOR, HOST, PLAYER, REFEREE, REQUIRED, STREAMER } from '../../../../constants';
import { Schema, object, date, string, array } from 'yup';
import { AuthService } from '../../../../services/authService';
import FormDialogBase from '../../dialog/FormDialogBase';
import { EventParticipantDto } from '../../../../dto/user/EventParticipantDto';
import MatchCreateFormView from './views/MatchCreateFormView';
import { IUserDto } from '../../../../dto/user/IUserDto';
import { MatchCreateDto } from '../../../../dto/schedule/MatchCreateDto';
import { MatchDto } from '../../../../dto/schedule/MatchDto';
import { MatchService } from '../../../../services/matchService';

const MatchCreateForm = ({stageId}: {stageId: string}) => {
    const { id } = useParams();
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);

    const [selectValues, setSelectValues] = useState({
        streamers: [] as EventParticipantDto[],
        commentators: [] as EventParticipantDto[],
        referees: [] as EventParticipantDto[],
        players: [] as EventParticipantDto[]
    });
    const [open, setOpen] = useState(false);

    const authService = new AuthService();
    dayjs.extend(utc);

    const getUsersWithRole = (staff: IUserDto[], roles: string[]) => {
        return staff
            .filter(user => user.roles.some(userRole => roles.includes(userRole.name)))
            .map(user => ({ name: user.name, country: user.country }));
    }

    useEffect(() => {
        if (id && open) {
            authService
                .getRoles(id, [HOST, ADMIN, REFEREE, STREAMER, COMMENTATOR, PLAYER])
                .then(users => setSelectValues({
                    players: getUsersWithRole(users, [PLAYER]),
                    streamers: getUsersWithRole(users, [STREAMER]),
                    commentators: getUsersWithRole(users, [COMMENTATOR]),
                    referees: getUsersWithRole(users, [HOST, ADMIN, REFEREE]),
            }));
        };
    }, [id, open]);

    const onSubmit = async(values: MatchCreateDto) => {
        const match: MatchDto = {
            ...values, 
            player1: selectValues.players.find(player => player.name === values.player1)!,
            player2: selectValues.players.find(player => player.name === values.player2)!
        }
        await new MatchService().create(match);
        setScheduleUpdate(scheduleUpdate + 1);
        setOpen(false);
    }

    const validationSchema: Schema = object({
        code: string()
            .required(REQUIRED),
        player1: string()
            .required(REQUIRED),
        player2: string()
            .required(REQUIRED)
            .when('player1', (player1, schema) => {
                return schema.test({
                    test: player2 => player1.toString() !== player2,
                    message: 'Players must be different'
                })
            }),
        time: date()
            .typeError('Invalid date format')
            .required(REQUIRED)
            .min(dayjs.utc(), 'Must be in the future'),
        commentators: array()
            .of(string())
            .max(2, 'Maximum 2 commentators')
    });

    const initialValues: MatchCreateDto = {
        id: '',
        stageId: stageId,
        code: '',
        time: dayjs.utc(),
        mpLink: '',
        score1: 0,
        score2: 0,
        isDone: false,
        player1: '',
        player2: '',
        referee: '',
        streamer: '',
        commentators: []
    }

    return (  
        <FormDialogBase 
            title={'Schedule new match'} 
            formName={'match-create-form'} 
            btnProps={{ 
                title: 'Add match', 
                startIcon: <PlaylistAdd/>, 
                sx: { width: 150 }
            }} 
            submitActionName={'Schedule'}
            open={open} 
            setOpen={setOpen}
            form={
                <MatchCreateFormView
                    initialValues={initialValues}
                    selectValues={selectValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}/>
            }/>
    );
}

export default MatchCreateForm;