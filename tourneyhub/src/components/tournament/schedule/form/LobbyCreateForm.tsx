import { PlaylistAdd } from '@mui/icons-material';
import FormDialogBase from '../../dialog/FormDialogBase';
import { useContext, useEffect, useState } from 'react';
import { AuthService } from '../../../../services/authService';
import { ADMIN, FUTURE_DATE, HOST, INVALID_DATE, REFEREE, REQUIRED } from '../../../../constants';
import { LobbyService } from '../../../../services/lobbyService';
import { Schema, date, object } from 'yup';
import { ErrorContext, UpdateContext } from '../../../../routes/Root';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import { UserDtoSimple } from '../../../../dto/user/UserDtoSimple';
import { LobbyCreateDto } from '../../../../dto/schedule/lobby/LobbyCreateDto';
import LoadingButton from '../../../LoadingButton';
import LobbyFormView from './views/LobbyFormView';

const LobbyCreateForm = ({stageId}: {stageId: string}) => {
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);
    const { setError } = useContext(ErrorContext);
    const { tourney } = useTourney();
    const [selectValues, setSelectValues] = useState([] as UserDtoSimple[]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const service = new LobbyService();
    dayjs.extend(utc);

    useEffect(() => {
        if (open) {
            new AuthService()
                .getUsersWithRoles(tourney.id, [HOST, ADMIN, REFEREE])
                .then(staff => setSelectValues(staff));
        }
    }, [open]);

    const onSubmit = async(values: LobbyCreateDto) => {
        const response = await service.create(values);

        if (service.isErrorResponse(response)) {
            return setError(response);
        }
        setScheduleUpdate(scheduleUpdate + 1);
        setOpen(false);
    }

    const validationSchema: Schema = object({
        time: date()
            .typeError(INVALID_DATE)
            .required(REQUIRED)
            .min(dayjs.utc().add(1, 'hour'), FUTURE_DATE)
    })

    const initialValues: LobbyCreateDto = {
        stageId: stageId,
        referee: '',
        time: dayjs.utc().add(2, 'hours')
    }

    return (  
        <FormDialogBase 
            title={'Schedule new lobby'}
            btnProps={{ 
                title: 'Add lobby', 
                startIcon: <PlaylistAdd/>, 
                sx: { width: 150 }
            }} 
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
                    sx={{ width: 110 }}>
                    Schedule
                </LoadingButton>
            }/>
    );
}

export default LobbyCreateForm;