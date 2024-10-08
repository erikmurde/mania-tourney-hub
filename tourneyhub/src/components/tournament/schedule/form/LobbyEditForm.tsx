import { Edit } from '@mui/icons-material';
import FormDialogBase from '../../dialog/FormDialogBase';
import { useContext, useEffect, useState } from 'react';
import { LobbyDto } from '../../../../dto/schedule/lobby/LobbyDto';
import { AuthService } from '../../../../services/authService';
import { ADMIN, FUTURE_DATE, HOST, INVALID_DATE, REFEREE, REQUIRED } from '../../../../constants';
import dayjs from 'dayjs';
import { Schema, object, date } from 'yup';
import { LobbyService } from '../../../../services/lobbyService';
import { ErrorContext, UpdateContext } from '../../../../routes/Root';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import { UserDtoSimple } from '../../../../dto/user/UserDtoSimple';
import { LobbyCreateDto } from '../../../../dto/schedule/lobby/LobbyCreateDto';
import LoadingButton from '../../../LoadingButton';
import LobbyFormView from './views/LobbyFormView';

const LobbyEditForm = ({lobby}: {lobby: LobbyDto}) => {
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);
    const { setError } = useContext(ErrorContext);
    const { tourney } = useTourney();
    const [selectValues, setSelectValues] = useState([] as UserDtoSimple[]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            new AuthService()
                .getUsersWithRoles(tourney.id, [HOST, ADMIN, REFEREE])
                .then(staff => setSelectValues(staff));
        }
    }, [tourney.id, open]);

    const onSubmit = async(values: LobbyCreateDto) => {
        const error = await new LobbyService().edit(lobby.id, {
            referee: values.referee === '' ? null : values.referee,
            matchId: null,
            time: values.time,
            concluded: false
        });
        if (error) {
            return setError(error);
        }
        setScheduleUpdate(scheduleUpdate + 1);
        setOpen(false);
    }

    const initialValues: LobbyCreateDto = {
        stageId: lobby.stageId,
        referee: selectValues.find(staff => staff.name === lobby.referee)?.name ?? '',
        time: lobby.time
    }

    const validationSchema: Schema = object({
        time: date()
            .typeError(INVALID_DATE)
            .required(REQUIRED)
            .min(dayjs.utc(), FUTURE_DATE)
    })

    return (  
        <FormDialogBase 
            title={'Edit lobby'} 
            btnIcon={<Edit/>}
            btnProps={{ color: 'primary' }}
            size='xs'
            open={open} 
            setOpen={setOpen}
            form={
                <LobbyFormView 
                    initialValues={initialValues} 
                    selectValues={selectValues} 
                    validationSchema={validationSchema} 
                    onSubmit={async(values) => {
                        setLoading(true);
                        await onSubmit(values);
                        setLoading(false);
                }}/>
            }
            submitBtn={
                <LoadingButton loading={loading} type='submit' form='lobby-form'
                    sx={{ width: 80 }}>
                    Edit
                </LoadingButton>
            }/>
    );
}

export default LobbyEditForm;