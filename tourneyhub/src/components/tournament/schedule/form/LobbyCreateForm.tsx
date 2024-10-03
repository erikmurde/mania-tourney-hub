import { PlaylistAdd } from '@mui/icons-material';
import FormDialogBase from '../../dialog/FormDialogBase';
import { useContext, useEffect, useState } from 'react';
import LobbyCreateFormView from './views/LobbyCreateFormView';
import { AuthService } from '../../../../services/authService';
import { ADMIN, HOST, REFEREE, REQUIRED } from '../../../../constants';
import { LobbyService } from '../../../../services/lobbyService';
import { Schema, date, object } from 'yup';
import { UpdateContext } from '../../../../routes/Root';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import { UserDtoSimple } from '../../../../dto/user/UserDtoSimple';
import { LobbyCreateDto } from '../../../../dto/schedule/lobby/LobbyCreateDto';
import LoadingButton from '../../../LoadingButton';

const LobbyCreateForm = ({stageId}: {stageId: string}) => {
    const { tourney } = useTourney();
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);
    const [selectValues, setSelectValues] = useState([] as UserDtoSimple[]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    dayjs.extend(utc);

    useEffect(() => {
        if (open) {
            new AuthService()
                .getUsersWithRoles(tourney.id, [HOST, ADMIN, REFEREE])
                .then(staff => setSelectValues(staff));
        }
    }, [open]);

    const onSubmit = async(values: LobbyCreateDto) => {
        await new LobbyService().create(values);
        setScheduleUpdate(scheduleUpdate + 1);
        setOpen(false);
    }

    const validationSchema: Schema = object({
        time: date()
            .typeError('Invalid date format')
            .required(REQUIRED)
            .min(dayjs.utc(), 'Must be in the future')
    })

    const initialValues: LobbyCreateDto = {
        stageId: stageId,
        referee: '',
        time: dayjs.utc()
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
                <LobbyCreateFormView 
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
                <LoadingButton loading={loading} type='submit' form='lobby-create-form'
                    sx={{ width: 110 }}>
                    Schedule
                </LoadingButton>
            }/>
    );
}

export default LobbyCreateForm;