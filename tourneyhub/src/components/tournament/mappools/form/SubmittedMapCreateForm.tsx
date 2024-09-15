import { Button, Dialog } from '@mui/material';
import { DialogProps } from '../../../../props/DialogProps';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { Add } from '@mui/icons-material';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { ISubmittedMapDto } from '../../../../dto/map/ISubmittedMapDto';
import SubmittedMapFormView from './views/SubmittedMapFormView';
import { useLocation } from 'react-router-dom';
import { number, Schema } from 'yup';
import { baseMapSchema } from '../../../../domain/validation/baseMapSchema';
import { DUPLICATE_BEATMAP_ID, INTEGER, NOT_NEGATIVE, REQUIRED, TB } from '../../../../constants';

interface IProps {
    dialogProps: DialogProps,
    hasTb: boolean,
    stageId: string,
    isDuplicateId: (beatmapId: string) => boolean
}

const SubmittedCreateMapForm = ({dialogProps, stageId, hasTb, isDuplicateId}: IProps) => {
    const { open, onClose } = dialogProps;

    const onSubmit = (values: ISubmittedMapDto) => {
        if (values.mapType === TB) {
            values.index = 0;
        }
        console.log('Fetching map', values);
    }

    const initialValues: ISubmittedMapDto = {
        stageId: stageId,
        beatmapId: '',
        mapType: '',
        index: 0,
        comment: ''
    }

    const validationSchema: Schema = baseMapSchema(hasTb).shape({
        beatmapId: number()
            .required(REQUIRED)
            .integer(INTEGER)
            .min(0, NOT_NEGATIVE)
            .test('', 
                DUPLICATE_BEATMAP_ID, 
                beatmapId => !isDuplicateId(beatmapId.toString())
            )
    });

    return (  
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
            <TourneyDialogTitle title='Add new submitted map' onClose={onClose}/>
            <StyledDialogContent>
                <SubmittedMapFormView 
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                />
            </StyledDialogContent>
            <StyledDialogActions>
                <Button variant='contained' type='submit' form='submitted-map-form' startIcon={<Add/>}>
                    Create
                </Button>
            </StyledDialogActions>
        </Dialog>
    );
}

export default SubmittedCreateMapForm;