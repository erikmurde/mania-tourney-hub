import { Edit } from '@mui/icons-material';
import { Button, Dialog } from '@mui/material';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { DialogProps } from '../../../../props/DialogProps';
import UnsubmittedMapFormView from './views/UnsubmittedMapFormView';
import { IMapDto } from '../../../../dto/map/IMapDto';
import { useEffect, useState } from 'react';
import { MapTypeService } from '../../../../services/mapTypeService';
import { MapTypeDto } from '../../../../dto/mapType/MapTypeDto';

interface IProps {
    dialogProps: DialogProps,
    initialValues: IMapDto
}

const ManualMapEditForm = ({dialogProps, initialValues}: IProps) => {
    const [mapTypes, setMapTypes] = useState([] as MapTypeDto[]);

    useEffect(() => {
        new MapTypeService()
            .getAll()
            .then(types => setMapTypes(types));
    }, []);

    const onSubmit = (values: IMapDto) => {
        console.log('Manual edit', values);
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