import { Add } from '@mui/icons-material';
import { Button, Dialog } from '@mui/material';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { IStageDto } from '../../../../dto/stage/IStageDto';
import StageCreateFormView from './views/StageCreateFormView';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useContext } from 'react';
import { UpdateContext } from '../../../../routes/Root';
import { StageService } from '../../../../services/stageService';
import { Schema, date, number, object, string } from 'yup';
import { QUALIFIER, REQUIRED, STANDARD } from '../../../../constants';
import { StageTypeService } from '../../../../services/stageTypeService';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';

interface IProps {
    type: string,
    open: boolean,
    onClose: () => void
}

const StageCreateForm = ({type, open, onClose}: IProps) => {
    const { stageUpdate, setStageUpdate } = useContext(UpdateContext);
    const { tourney } = useTourney();
    dayjs.extend(utc);

    const onSubmit = async(values: IStageDto) => {
        const stageType = await new StageTypeService().getByName(type);

        if (stageType) {
            values.stageType = stageType;

            await new StageService().create(values);
            setStageUpdate(stageUpdate + 1);
            onClose();
        }
    }

    const validationSchema: Schema = object({
        name: string()
            .required(REQUIRED),
        bestOf: number()
            .required(REQUIRED)
            .min(type === STANDARD ? 1 : 0, 'Must be above 0'),
        lobbySize: number()
            .required(REQUIRED)
            .min(type === STANDARD ? 0 : 1, 'Must be above 0'),
        numAdvancing: number()
            .required(REQUIRED)
            .min(type === STANDARD ? 0 : 1, 'Must be above 0'),
        schedulingDeadline: date()
            .when(([], schema) => {
                if (type === QUALIFIER) {
                    return schema
                        .typeError('Invalid date format')
                        .required(REQUIRED)
                        .min(dayjs.utc(), 'Must be in the future');
                }
                return schema.notRequired()
            }),
    });

    const initialValues: IStageDto = {
        id: 0,
        stageType: { id: 0, name: type },
        tournamentId: tourney.id,
        name: '',
        bestOf: 0,
        lobbySize: 0,
        numAdvancing: 0,
        schedulingDeadline: dayjs.utc(),
        mappoolPublished: false,
        schedulePublished: false,
        statsPublished: false
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