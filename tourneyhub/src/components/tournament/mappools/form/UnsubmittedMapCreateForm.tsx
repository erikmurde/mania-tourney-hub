import { Dialog, Button } from '@mui/material';
import { DialogProps } from '../../../../props/DialogProps';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { Add } from '@mui/icons-material';
import { IMapDto } from '../../../../dto/map/IMapDto';
import UnsubmittedMapFormView from './views/UnsubmittedMapFormView';
import { useContext } from 'react';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import { AuthContext, UpdateContext } from '../../../../routes/Root';
import { TB } from '../../../../constants';
import { unsubmittedMapSchema } from '../../../../domain/validation/unsubmittedMapSchema';
import { MapService } from '../../../../services/mapService';

interface IProps {
    dialogProps: DialogProps,
    hasTb: boolean,
    stageId: string
}

const UnsubmittedMapCreateForm = ({dialogProps, hasTb, stageId}: IProps) => {
    const { mapPoolUpdate, setMapPoolUpdate } = useContext(UpdateContext);
    const { user } = useContext(AuthContext);
    const { open, onClose } = dialogProps;

    const onSubmit = async(values: IMapDto) => {
        if (!user) {
            return;
        }
        if (values.mapType === TB) {
            values.index = 0;
        }
        await new MapService().create(values);
        setMapPoolUpdate(mapPoolUpdate + 1);
        onClose();
    }

    const initialValues: IMapDto = {
        id: '',
        stageId: stageId,
        beatmapId: '',
        inMappool: false,
        title: '',
        diff: '',
        artist: '',
        mapper: '',
        suggestor: user?.name ?? '',
        cover: '',
        download: '',
        bpm: 0,
        drainTime: 0,
        sr: 0,
        hp: 0,
        od: 0,
        index: 0,
        comment: '',
        mapType: ''
    }

    return (  
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
            <TourneyDialogTitle title='Add new unsubmitted map' onClose={onClose}/>
            <StyledDialogContent>
                <UnsubmittedMapFormView 
                    initialValues={initialValues} 
                    validationSchema={unsubmittedMapSchema(hasTb)}
                    onSubmit={onSubmit}/>
            </StyledDialogContent>
            <StyledDialogActions>
                <Button variant='contained' type='submit' form='unsubmitted-map-form' startIcon={<Add/>}>
                    Create
                </Button>
            </StyledDialogActions>
        </Dialog>
    );
}

export default UnsubmittedMapCreateForm;