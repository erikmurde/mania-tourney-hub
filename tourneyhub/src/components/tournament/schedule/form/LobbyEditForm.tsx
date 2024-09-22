import { Edit } from '@mui/icons-material';
import FormDialogBase from '../../dialog/FormDialogBase';
import LobbyCreateFormView from './views/LobbyCreateFormView';
import { useContext, useEffect, useState } from 'react';
import { LobbyDto } from '../../../../dto/schedule/LobbyDto';
import { AuthService } from '../../../../services/authService';
import { ADMIN, HOST, REFEREE, REQUIRED } from '../../../../constants';
import dayjs from 'dayjs';
import { Schema, object, date } from 'yup';
import { LobbyService } from '../../../../services/lobbyService';
import { UpdateContext } from '../../../../routes/Root';
import { UserDto } from '../../../../dto/user/UserDto';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import { UserDtoSimple } from '../../../../dto/user/UserDtoSimple';

const LobbyEditForm = ({lobby}: {lobby: LobbyDto}) => {
    const { tourney } = useTourney();
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);
    const [open, setOpen] = useState(false);
    const [selectValues, setSelectValues] = useState([] as UserDtoSimple[]);

    useEffect(() => {
        if (open) {
            new AuthService()
                .getUsersWithRoles(tourney.id, [HOST, ADMIN, REFEREE])
                .then(staff => setSelectValues(staff));
        }
    }, [tourney.id, open]);

    const onSubmit = async(values: LobbyDto) => {
        await new LobbyService().edit(values.id, values);
        setScheduleUpdate(scheduleUpdate + 1);
        setOpen(false);
    }

    const validationSchema: Schema = object({
        time: date()
            .typeError('Invalid date format')
            .required(REQUIRED)
            .min(dayjs.utc(), 'Must be in the future')
    })

    return (  
        <FormDialogBase 
            title={'Edit lobby'} 
            formName={'lobby-create-form'} 
            btnIcon={<Edit/>}
            btnProps={{ color: 'primary' }}
            submitActionName={'Edit'}
            size='xs'
            open={open} 
            setOpen={setOpen}
            form={
                <LobbyCreateFormView 
                    initialValues={lobby} 
                    selectValues={selectValues} 
                    validationSchema={validationSchema} 
                    onSubmit={onSubmit}/>
            }/>
    );
}

export default LobbyEditForm;