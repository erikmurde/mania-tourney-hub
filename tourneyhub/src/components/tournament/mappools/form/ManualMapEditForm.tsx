import { Edit } from '@mui/icons-material';
import { Button, Dialog } from '@mui/material';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { DialogProps } from '../../../../props/DialogProps';
import UnsubmittedMapFormView from './views/UnsubmittedMapFormView';
import { IMapDto } from '../../../../dto/map/IMapDto';
import { useContext } from 'react';
import { UpdateContext } from '../../../../routes/Root';
import { MapService } from '../../../../services/mapService';
import { DUPLICATE_BEATMAP_ID, INTEGER, NOT_NEGATIVE } from '../../../../constants';
import { unsubmittedMapSchema } from '../../../../domain/validation/unsubmittedMapSchema';
import { number, Schema } from 'yup';
import { MapTypeDto } from '../../../../dto/map/MapTypeDto';

interface IProps {
    dialogProps: DialogProps,
    initialValues: IMapDto,
    mapTypes: MapTypeDto[],
    hasTb: boolean,
    isDuplicateId: (id: string, beatmapId: number | null ) => boolean,
}

const ManualMapEditForm = ({dialogProps, initialValues, mapTypes, hasTb, isDuplicateId}: IProps) => {
    const { mapPoolUpdate, setMapPoolUpdate } = useContext(UpdateContext);
    const { open, onClose } = dialogProps;

    const onSubmit = async(values: IMapDto) => {
        values.mapTypeId = mapTypes.find(mapType => mapType.name === values.mapType)!.id;

        await new MapService().updateUnsubmitted(values.id, values);
        setMapPoolUpdate(mapPoolUpdate + 1);
        onClose();
    }

    const validationSchema: Schema = unsubmittedMapSchema(hasTb).shape({
        beatmapId: number()
            .notRequired()
            .integer(INTEGER)
            .min(0, NOT_NEGATIVE)
            .test('', 
                DUPLICATE_BEATMAP_ID, 
                beatmapId => !isDuplicateId(initialValues.id, beatmapId ?? null)
            )
    });

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
                    validationSchema={validationSchema}
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