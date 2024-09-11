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
import { MapService } from '../../../../services/mapService';
import { useLocation } from 'react-router-dom';
import { MAP_TYPES } from '../../../../constants';

const UnsubmittedMapCreateForm = ({open, onClose}: DialogProps) => {
    const { mapPoolUpdate, setMapPoolUpdate } = useContext(UpdateContext);
    const { user } = useContext(AuthContext);
    const location = useLocation();

    const onSubmit = async(values: IMapDto) => {
        if (!user) {
            return;
        }
        await new MapService().create(values);
        setMapPoolUpdate(mapPoolUpdate + 1);
        onClose();
    }

    const initialValues: IMapDto = {
        id: '',
        stageId: location.hash.split('#')[1],
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
                    selectValues={MAP_TYPES} 
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