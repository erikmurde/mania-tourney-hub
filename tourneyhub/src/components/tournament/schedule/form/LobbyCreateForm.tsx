import { PlaylistAdd } from '@mui/icons-material';
import FormDialogBase from '../../dialog/FormDialogBase';
import { useContext, useEffect, useState } from 'react';
import LobbyCreateFormView from './views/LobbyCreateFormView';
import { AuthService } from '../../../../services/authService';
import { useParams } from 'react-router-dom';
import { ADMIN, HOST, REFEREE, REQUIRED } from '../../../../constants';
import { LobbyDto } from '../../../../dto/schedule/LobbyDto';
import { LobbyService } from '../../../../services/lobbyService';
import { Schema, date, object } from 'yup';
import { UpdateContext } from '../../../../routes/Root';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { UserDto } from '../../../../dto/user/UserDto';

const LobbyCreateForm = ({stageId}: {stageId: string}) => {
    const { id } = useParams();
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);
    const [selectValues, setSelectValues] = useState([] as UserDto[]);
    const [lobbies, setLobbies] = useState([] as LobbyDto[]);
    const [open, setOpen] = useState(false);
    const service = new LobbyService();
    dayjs.extend(utc);

    useEffect(() => {
        if (id && open) {
            new AuthService()
                .getRoles(id, [HOST, ADMIN, REFEREE])
                .then(staff => setSelectValues(staff));

            service
                .getAllStage(stageId)
                .then(lobbies => {
                    setLobbies(lobbies);
            });
        }
    }, [id, open]);

    const onSubmit = async(values: LobbyDto) => {
        await service.create(values);
        setScheduleUpdate(scheduleUpdate + 1);
        setOpen(false);
    }

    const validationSchema: Schema = object({
        time: date()
            .typeError('Invalid date format')
            .required(REQUIRED)
            .min(dayjs.utc(), 'Must be in the future')
    })

    const initialValues: LobbyDto = {
        id: '',
        stageId: stageId,
        code: `Q${(lobbies.length + 1).toString().padStart(2, '0')}`,
        time: dayjs.utc(),
        mpLink: '',
        isDone: false,
        players: [],
        referee: ''
    }

    return (  
        <FormDialogBase 
            title={'Schedule new lobby'} 
            formName={'lobby-create-form'} 
            btnProps={{ 
                title: 'Add lobby', 
                startIcon: <PlaylistAdd/>, 
                sx: { width: 150 }
            }} 
            submitActionName={'Schedule'}
            size='xs'
            open={open} 
            setOpen={setOpen}
            form={
                <LobbyCreateFormView 
                    initialValues={initialValues} 
                    selectValues={selectValues} 
                    validationSchema={validationSchema} 
                    onSubmit={onSubmit}/>
            }/>
    );
}

export default LobbyCreateForm;