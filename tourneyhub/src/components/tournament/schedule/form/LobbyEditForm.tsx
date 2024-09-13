import { Edit } from '@mui/icons-material';
import FormDialogBase from '../../dialog/FormDialogBase';
import LobbyCreateFormView from './views/LobbyCreateFormView';
import { useContext, useEffect, useState } from 'react';
import { LobbyDto } from '../../../../dto/schedule/LobbyDto';
import { UserDtoSimple } from '../../../../dto/user/UserDtoSimple';
import { useParams } from 'react-router-dom';
import { AuthService } from '../../../../services/authService';
import { ADMIN, HOST, REFEREE, REQUIRED } from '../../../../constants';
import dayjs from 'dayjs';
import { Schema, object, date } from 'yup';
import { LobbyService } from '../../../../services/lobbyService';
import { UpdateContext } from '../../../../routes/Root';

const LobbyEditForm = ({lobby}: {lobby: LobbyDto}) => {
    const { id } = useParams();
    const { scheduleUpdate, setScheduleUpdate } = useContext(UpdateContext);
    const [open, setOpen] = useState(false);
    const [selectValues, setSelectValues] = useState([] as UserDtoSimple[]);

    useEffect(() => {
        if (id && open) {
            new AuthService()
                .getRoles(id, [HOST, ADMIN, REFEREE])
                .then(staff => setSelectValues(
                    staff.map(user => ({ name: user.name, country: user.country }))
                ));
        }
    }, [id, open]);

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