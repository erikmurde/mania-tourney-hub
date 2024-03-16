import { Add } from '@mui/icons-material';
import { Button, Dialog } from '@mui/material';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { IStageDto } from '../../../../dto/stage/IStageDto';
import StageCreateFormView from './views/StageCreateFormView';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UpdateContext } from '../../../../routes/Root';
import { StageService } from '../../../../services/stageService';
import { Schema, date, number, object, string } from 'yup';
import { QUALIFIER, REQUIRED, STANDARD } from '../../../../constants';

interface IProps {
    stageType: string,
    open: boolean,
    onClose: () => void
}

const StageCreateForm = ({stageType, open, onClose}: IProps) => {
    const { stageUpdate, setStageUpdate } = useContext(UpdateContext);
    const { id } = useParams();
    dayjs.extend(utc);

    const onSubmit = async(values: IStageDto) => {
        await new StageService().create(values);
        setStageUpdate(stageUpdate + 1);
        onClose();
    }

    const validationSchema: Schema = object({
        name: string()
            .required(REQUIRED),
        bestOf: number()
            .required(REQUIRED)
            .min(stageType === STANDARD ? 1 : 0, 'Must be above 0'),
        lobbySize: number()
            .required(REQUIRED)
            .min(stageType === STANDARD ? 0 : 1, 'Must be above 0'),
        numAdvancing: number()
            .required(REQUIRED)
            .min(stageType === STANDARD ? 0 : 1, 'Must be above 0'),
        schedulingDeadline: date()
            .when(([], schema) => {
                if (stageType === QUALIFIER) {
                    return schema
                        .typeError('Invalid date format')
                        .required(REQUIRED)
                        .min(dayjs.utc(), 'Must be in the future');
                }
                return schema.notRequired()
            }),
    });

    const initialValues: IStageDto = {
        id: '',
        stageType: stageType,
        tournamentId: id!,
        name: '',
        bestOf: 0,
        lobbySize: 0,
        numAdvancing: 0,
        schedulingDeadline: dayjs.utc(),
        mappoolPublic: false,
        schedulePublic: false,
        statsPublic: false
    };

    return (  
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
            <TourneyDialogTitle title='Add new stage' onClose={onClose}/>
            <StyledDialogContent>
                <StageCreateFormView 
                    initialValues={initialValues} 
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                />
            </StyledDialogContent>
            <StyledDialogActions>
                <Button variant='contained' type='submit' form='stage-create-form' startIcon={<Add/>}>
                    Create
                </Button>
            </StyledDialogActions>
        </Dialog>
    );
}

export default StageCreateForm;