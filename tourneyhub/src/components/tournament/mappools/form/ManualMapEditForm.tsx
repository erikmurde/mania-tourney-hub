import { Edit } from '@mui/icons-material';
import { Dialog } from '@mui/material';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { DialogProps } from '../../../../domain/DialogProps';
import UnsubmittedMapFormView from './views/UnsubmittedMapFormView';
import { IMapDto } from '../../../../dto/map/IMapDto';
import { useContext, useState } from 'react';
import { ErrorContext, UpdateContext } from '../../../../routes/Root';
import { MapService } from '../../../../services/mapService';
import { unsubmittedMapSchema } from '../../../../domain/validation/unsubmittedMapSchema';
import { MapTypeDto } from '../../../../dto/map/MapTypeDto';
import LoadingButton from '../../../LoadingButton';

interface IProps {
    dialogProps: DialogProps,
    initialValues: IMapDto,
    mapTypes: MapTypeDto[],
    hasTb: boolean,
    isDuplicateId: (id: string, beatmapId: number | null ) => boolean,
}

const ManualMapEditForm = ({dialogProps, initialValues, mapTypes, hasTb, isDuplicateId}: IProps) => {
    const { mapPoolUpdate, setMapPoolUpdate } = useContext(UpdateContext);
    const { setError } = useContext(ErrorContext);
    const [loading, setLoading] = useState(false);
    const { open, onClose } = dialogProps;

    const onSubmit = async(values: IMapDto) => {
        values.mapTypeId = mapTypes.find(mapType => mapType.name === values.mapType)!.id;
        const error = await new MapService().updateUnsubmitted(values.id, values);

        if (error) {
            return setError(error);
        }
        setMapPoolUpdate(mapPoolUpdate + 1);
        onClose();
    }

    return (  
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
            <TourneyDialogTitle title='Edit map' onClose={onClose}/>
            <StyledDialogContent>
                <UnsubmittedMapFormView 
                    initialValues={{
                        ...initialValues, 
                        mapType: mapTypes.length > 0 ? initialValues.mapType : ''
                    }}
                    mapTypes={mapTypes}
                    validationSchema={unsubmittedMapSchema(hasTb)}
                    onSubmit={async(values) => {
                        setLoading(true);
                        await onSubmit(values);
                        setLoading(false);
                    }}
                />
            </StyledDialogContent>
            <StyledDialogActions>
                <LoadingButton loading={loading} type='submit' form='unsubmitted-map-form' 
                    startIcon={<Edit/>}
                    sx={{ width: 100 }}>
                    Edit
                </LoadingButton>
            </StyledDialogActions>
        </Dialog>
    );
}

export default ManualMapEditForm;