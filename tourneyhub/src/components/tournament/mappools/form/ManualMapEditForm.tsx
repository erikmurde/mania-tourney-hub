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
import { DUPLICATE_BEATMAP_ID, INTEGER, MAP_TYPES, NOT_NEGATIVE } from '../../../../constants';
import { unsubmittedMapSchema } from '../../../../domain/validation/unsubmittedMapSchema';
import { number, Schema } from 'yup';

interface IProps {
    dialogProps: DialogProps,
    initialValues: IMapDto,
    hasTb: boolean,
    isDuplicateId: (id: string, beatmapId?: string) => boolean,
}

const ManualMapEditForm = ({dialogProps, initialValues, hasTb, isDuplicateId}: IProps) => {
    const { mapPoolUpdate, setMapPoolUpdate } = useContext(UpdateContext);
    const { open, onClose } = dialogProps;

    const onSubmit = async(values: IMapDto) => {
        if (initialValues.index !== values.index || initialValues.mapType !== values.mapType) {
            values.inMappool = false;
        }
        await new MapService().edit(values.id, values);
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
                beatmapId => !isDuplicateId(initialValues.id, beatmapId?.toString())
            )
    });

    return (  
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
            <TourneyDialogTitle title='Edit map' onClose={onClose}/>
            <StyledDialogContent>
                <UnsubmittedMapFormView 
                    initialValues={{
                        ...initialValues, 
                        mapType: MAP_TYPES.length > 0 ? initialValues.mapType : ''
                    }}
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