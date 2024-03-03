import { Edit } from '@mui/icons-material';
import { Button, Dialog } from '@mui/material';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { DialogProps } from '../../../../props/DialogProps';
import UnsubmittedMapFormView from './views/UnsubmittedMapFormView';
import { IMapDto } from '../../../../dto/map/IMapDto';
import { useContext, useEffect, useState } from 'react';
import { MapTypeService } from '../../../../services/mapTypeService';
import { MapTypeDto } from '../../../../dto/mapType/MapTypeDto';
import { UpdateContext } from '../../../../routes/Root';
import { MapService } from '../../../../services/mapService';

interface IProps {
    dialogProps: DialogProps,
    initialValues: IMapDto
}

const ManualMapEditForm = ({dialogProps, initialValues}: IProps) => {
    const { mapPoolUpdate, setMapPoolUpdate } = useContext(UpdateContext);
    const [mapTypes, setMapTypes] = useState([] as MapTypeDto[]);

    useEffect(() => {
        new MapTypeService()
            .getAll()
            .then(types => setMapTypes(types));
    }, []);

    const onSubmit = async(values: IMapDto) => {
        if (initialValues.index !== values.index || initialValues.mapTypeId !== values.mapTypeId) {
            values.inMappool = false;
        }
        await new MapService().edit(values.id, values);
        setMapPoolUpdate(mapPoolUpdate + 1);
        dialogProps.onClose();
    }

    return (  
        <Dialog open={dialogProps.open} onClose={dialogProps.onClose} fullWidth maxWidth='md'>
            <TourneyDialogTitle title='Edit map' onClose={dialogProps.onClose}/>
            <StyledDialogContent>
                <UnsubmittedMapFormView 
                    initialValues={{
                        ...initialValues, 
                        mapTypeId: mapTypes.length > 0 ? initialValues.mapTypeId : ''
                    }} 
                    selectValues={mapTypes} 
                    onSubmit={onSubmit}
                />
            </StyledDialogContent>
            <StyledDialogActions>
                <Button variant='contained' type='submit' form='unsubmitted-map-form' startIcon={<Edit/>}>
                    Edit
                </Button>
            </StyledDialogActions>
        </Dialog>
    );
}

export default ManualMapEditForm;