import { Add } from '@mui/icons-material';
import { Button, Dialog } from '@mui/material';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { IStageDto } from '../../../../dto/stage/IStageDto';
import StageCreateFormView from './views/StageCreateFormView';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

interface IProps {
    stageType: string,
    open: boolean,
    onClose: () => void
}

const StageCreateForm = ({stageType, open, onClose}: IProps) => {
    const { id } = useParams();

    const onSubmit = (values: IStageDto) => {
        console.log('creating: ', values);
        onClose();
    }

    const initialValues: IStageDto = {
        id: '',
        stageTypeId: stageType,
        tournamentId: id!,
        name: '',
        bestOf: 0,
        lobbySize: 0,
        numAdvancing: 0,
        schedulingDeadline: dayjs(),
        mappoolPublic: false,
        schedulePublic: false,
        statsPublic: false
    }

    return (  
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
            <TourneyDialogTitle title='Add new stage' onClose={onClose}/>
            <StyledDialogContent>
                <StageCreateFormView 
                    initialValues={initialValues} 
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