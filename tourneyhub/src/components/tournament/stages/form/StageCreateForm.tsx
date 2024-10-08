import { Add } from '@mui/icons-material';
import { Dialog } from '@mui/material';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { IStageDto } from '../../../../dto/stage/IStageDto';
import StageCreateFormView from './views/StageCreateFormView';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useContext, useState } from 'react';
import { ErrorContext, UpdateContext } from '../../../../routes/Root';
import { StageService } from '../../../../services/stageService';
import { Schema, date, number, object, string } from 'yup';
import { FUTURE_DATE, INVALID_DATE, QUALIFIER, REQUIRED, STANDARD } from '../../../../constants';
import { StageTypeService } from '../../../../services/stageTypeService';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import LoadingButton from '../../../LoadingButton';
import { POSITIVE } from '../../../../domain/validation/unsubmittedMapSchema';

interface IProps {
    type: string,
    open: boolean,
    onClose: () => void
}

const StageCreateForm = ({type, open, onClose}: IProps) => {
    const { stageUpdate, setStageUpdate } = useContext(UpdateContext);
    const { setError } = useContext(ErrorContext);
    const { tourney } = useTourney();
    const [loading, setLoading] = useState(false);
    const stageService = new StageService();
    const stageTypeService = new StageTypeService();
    dayjs.extend(utc);

    const onSubmit = async(values: IStageDto) => {
        const stageType = await stageTypeService.getByName(type);

        if (stageTypeService.isErrorResponse(stageType)) {
            return setError(stageType);
        }
        const response = await stageService.create({...values, stageType: stageType});

        if (stageService.isErrorResponse(response)) {
            return setError(response);
        }
        setStageUpdate(stageUpdate + 1);
        onClose();
    }

    const validationSchema: Schema = object({
        name: string()
            .required(REQUIRED),
        bestOf: number()
            .required(REQUIRED)
            .min(type === STANDARD ? 1 : 0, POSITIVE),
        lobbySize: number()
            .required(REQUIRED)
            .min(type === STANDARD ? 0 : 1, POSITIVE),
        numAdvancing: number()
            .required(REQUIRED)
            .min(type === STANDARD ? 0 : 1, POSITIVE),
        schedulingDeadline: date()
            .when(([], schema) => {
                if (type === QUALIFIER) {
                    return schema
                        .typeError(INVALID_DATE)
                        .required(REQUIRED)
                        .min(dayjs.utc(), FUTURE_DATE);
                }
                return schema.notRequired()
            }),
    });

    const initialValues: IStageDto = {
        id: '',
        stageType: { id: '', name: type },
        tournamentId: tourney.id,
        name: '',
        bestOf: 0,
        lobbySize: 0,
        numAdvancing: 0,
        schedulingDeadline: dayjs.utc().add(1, 'day'),
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
                    onSubmit={async(values) => {
                        setLoading(true);
                        await onSubmit(values);
                        setLoading(false);
                    }}
                />
            </StyledDialogContent>
            <StyledDialogActions>
                <LoadingButton loading={loading} type='submit' form='stage-create-form' 
                    startIcon={<Add/>}
                    sx={{ width: 110 }}>
                    Create
                </LoadingButton>
            </StyledDialogActions>
        </Dialog>
    );
}

export default StageCreateForm;