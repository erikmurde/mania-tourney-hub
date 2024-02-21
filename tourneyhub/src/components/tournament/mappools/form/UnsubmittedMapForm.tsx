import { Dialog, Button } from '@mui/material';
import { DialogProps } from '../../../../props/DialogProps';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { Add } from '@mui/icons-material';
import { IMapDto } from '../../../../dto/map/IMapDto';
import UnsubmittedMapFormView from './views/UnsubmittedMapFormView';
import { useContext, useEffect, useState } from 'react';
import { MapTypeDto } from '../../../../dto/mapType/MapTypeDto';
import { MapTypeService } from '../../../../services/mapTypeService';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import { AuthContext } from '../../../../routes/Root';
import { MapService } from '../../../../services/mapService';
import { useLocation } from 'react-router-dom';

const UnsubmittedMapForm = ({open, onClose}: DialogProps) => {
    const { user } = useContext(AuthContext);
    const [mapTypes, setMapTypes] = useState([] as MapTypeDto[]);
    const location = useLocation();

    useEffect(() => {
        new MapTypeService()
            .getAll()
            .then(types => setMapTypes(types));
    }, []);

    const onSubmit = async(values: IMapDto) => {
        if (!user) {
            return;
        }
        values.suggestor = user.name;
        values.stageId = location.hash.split('#')[1];

        await new MapService().create(values);
        onClose();
    }

    return (  
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
        <TourneyDialogTitle title='Add new unsubmitted map' onClose={onClose}/>
            <StyledDialogContent>
                <UnsubmittedMapFormView selectValues={mapTypes} onSubmit={onSubmit}/>
            </StyledDialogContent>
            <StyledDialogActions>
                <Button variant='contained' type='submit' form='unsubmitted-map-form' startIcon={<Add/>}>
                    Create
                </Button>
            </StyledDialogActions>
        </Dialog>
    );
}

export default UnsubmittedMapForm;