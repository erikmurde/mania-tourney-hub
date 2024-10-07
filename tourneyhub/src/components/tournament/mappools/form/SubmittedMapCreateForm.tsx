import { Dialog } from '@mui/material';
import { DialogProps } from '../../../../props/DialogProps';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { Add } from '@mui/icons-material';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { ISubmittedMapDto } from '../../../../dto/map/ISubmittedMapDto';
import SubmittedMapFormView from './views/SubmittedMapFormView';
import { number, Schema } from 'yup';
import { baseMapSchema } from '../../../../domain/validation/baseMapSchema';
import { DUPLICATE_BEATMAP_ID, INTEGER, NOT_NEGATIVE, REQUIRED, TOO_LARGE } from '../../../../constants';
import { MapService } from '../../../../services/mapService';
import { useContext, useEffect, useState } from 'react';
import { ErrorContext, UpdateContext } from '../../../../routes/Root';
import { MapTypeDto } from '../../../../dto/map/MapTypeDto';
import { MapTypeService } from '../../../../services/mapTypeService';
import LoadingButton from '../../../LoadingButton';

interface IProps {
    dialogProps: DialogProps,
    hasTb: boolean,
    stageId: string,
    isDuplicateId: (beatmapId: number) => boolean
}

const SubmittedCreateMapForm = ({dialogProps, stageId, hasTb, isDuplicateId}: IProps) => {
    const { mapPoolUpdate, setMapPoolUpdate } = useContext(UpdateContext);
    const { setError } = useContext(ErrorContext);
    const [loading, setLoading] = useState(false);
    const [mapTypes, setMapTypes] = useState([] as MapTypeDto[]);
    const { open, onClose } = dialogProps;

    useEffect(() => {
        if (open && mapTypes.length === 0) {
            new MapTypeService()
                .getAll()
                .then(mapTypes => setMapTypes(mapTypes));
        }
    }, [open, mapTypes.length]);

    const onSubmit = async(values: ISubmittedMapDto) => {
        values.mapTypeId = mapTypes.find(mapType => mapType.name === values.mapType)!.id;
        const error = await new MapService().createSubmitted(values);

        if (error) {
            return setError(error);
        }
        setMapPoolUpdate(mapPoolUpdate + 1);
        onClose();
    }

    const initialValues: ISubmittedMapDto = {
        stageId: stageId,
        beatmapId: 0,
        mapTypeId: '',
        mapType: '',
        index: 0,
        comment: ''
    }

    const validationSchema: Schema = baseMapSchema(hasTb).shape({
        beatmapId: number()
            .required(REQUIRED)
            .integer(INTEGER)
            .min(0, NOT_NEGATIVE)
            .max(100000000, TOO_LARGE)
            .test('', 
                DUPLICATE_BEATMAP_ID, 
                beatmapId => !isDuplicateId(beatmapId)
            )
    });

    return (  
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
            <TourneyDialogTitle title='Add new submitted map' onClose={onClose}/>
            <StyledDialogContent>
                <SubmittedMapFormView 
                    initialValues={initialValues}
                    mapTypes={mapTypes}
                    validationSchema={validationSchema}
                    onSubmit={async(values) => {
                        setLoading(true);
                        await onSubmit(values);
                        setLoading(false);
                    }}
                />
            </StyledDialogContent>
            <StyledDialogActions>
                <LoadingButton loading={loading} type='submit' form='submitted-map-form' 
                    startIcon={<Add/>}
                    sx={{ width: 110 }}>
                    Create
                </LoadingButton>
            </StyledDialogActions>
        </Dialog>
    );
}

export default SubmittedCreateMapForm;