import { Dialog, Button } from '@mui/material';
import { DialogProps } from '../../../../props/DialogProps';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { Add } from '@mui/icons-material';
import { IMapDto } from '../../../../dto/map/IMapDto';
import UnsubmittedMapFormView from './views/UnsubmittedMapFormView';
import { useContext, useEffect, useState } from 'react';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import { AuthContext, UpdateContext } from '../../../../routes/Root';
import { unsubmittedMapSchema } from '../../../../domain/validation/unsubmittedMapSchema';
import { MapService } from '../../../../services/mapService';
import { MapTypeDto } from '../../../../dto/map/MapTypeDto';
import { MapTypeService } from '../../../../services/mapTypeService';

interface IProps {
    dialogProps: DialogProps,
    hasTb: boolean,
    stageId: number
}

const UnsubmittedMapCreateForm = ({dialogProps, hasTb, stageId}: IProps) => {
    const { mapPoolUpdate, setMapPoolUpdate } = useContext(UpdateContext);
    const { user } = useContext(AuthContext);
    const [mapTypes, setMapTypes] = useState([] as MapTypeDto[]);
    const { open, onClose } = dialogProps;

    useEffect(() => {
        if (open && mapTypes.length === 0) {
            new MapTypeService()
                .getAll()
                .then(mapTypes => setMapTypes(mapTypes));
        }
    }, [open, mapTypes.length]);

    if (!user) {
        return <></>;
    }

    const onSubmit = async(values: IMapDto) => {
        values.mapTypeId = mapTypes.find(mapType => mapType.name === values.mapType)!.id;

        await new MapService().createUnsubmitted(values);
        setMapPoolUpdate(mapPoolUpdate + 1);
        onClose();
    }

    const initialValues: IMapDto = {
        id: 0,
        stageId: stageId,
        mapTypeId: 0,
        beatmapId: 0,
        inMappool: false,
        title: '',
        diff: '',
        artist: '',
        mapper: '',
        suggestor: user.name,
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
                    mapTypes={mapTypes}
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