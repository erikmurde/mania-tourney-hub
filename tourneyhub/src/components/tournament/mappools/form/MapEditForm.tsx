import { Button, Dialog, useTheme } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import ManualMapEditForm from './ManualMapEditForm';
import { IMapDto } from '../../../../dto/map/IMapDto';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import { StyledIconButton } from '../../../styled/StyledIconButton';
import { Edit } from '@mui/icons-material';
import { DUPLICATE_BEATMAP_ID, INTEGER, LOGIN_URL, NOT_NEGATIVE, REQUIRED, TB, TOO_LARGE } from '../../../../constants';
import { MapTypeDto } from '../../../../dto/map/MapTypeDto';
import { MapTypeService } from '../../../../services/mapTypeService';
import SubmittedMapFormView from './views/SubmittedMapFormView';
import { ISubmittedMapDto } from '../../../../dto/map/ISubmittedMapDto';
import { number, Schema } from 'yup';
import { baseMapSchema } from '../../../../domain/validation/baseMapSchema';
import { MapService } from '../../../../services/mapService';
import { ErrorContext, UpdateContext } from '../../../../routes/Root';
import LoadingButton from '../../../LoadingButton';

interface IProps {
    mappool: IMapDto[],
    map: IMapDto
}

const MapEditForm = ({mappool, map}: IProps) => {
    const { mapPoolUpdate, setMapPoolUpdate } = useContext(UpdateContext);
    const { setError } = useContext(ErrorContext);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openManual, setOpenManual] = useState(false);
    const [mapTypes, setMapTypes] = useState([] as MapTypeDto[]);
    const theme = useTheme();

    useEffect(() => {
        if (open && mapTypes.length === 0) {
            new MapTypeService()
                .getAll()
                .then(mapTypes => setMapTypes(mapTypes));
        }
    }, [open, mapTypes.length]);

    const onSubmit = async(values: ISubmittedMapDto) => {
        values.mapTypeId = mapTypes.find(mapType => mapType.name === values.mapType)!.id;
        const error = await new MapService().updateSubmitted(map.id, values);

        if (error) {
            if (error.statusCode === 401) {
                return window.location.assign(LOGIN_URL);
            }
            return setError(error);
        }
        setMapPoolUpdate(mapPoolUpdate + 1);
        setOpen(false);
    }

    const isDuplicateId = (id: string, beatmapId: number | null) => {
        return beatmapId !== null 
            && mappool.some(map => map.id !== id && map.beatmapId === beatmapId);
    }

    const hasTb = mappool.some(map => map.mapType === TB);

    const validationSchema: Schema = baseMapSchema(hasTb).shape({
        beatmapId: number()
            .required(REQUIRED)
            .integer(INTEGER)
            .min(0, NOT_NEGATIVE)
            .max(100000000, TOO_LARGE)
            .test('', 
                DUPLICATE_BEATMAP_ID, 
                beatmapId => !isDuplicateId(map.id, beatmapId)
            )
    });

    return (  
        <>
        <StyledIconButton
            sx={{ color: theme.palette.primary.main}} 
            onClick={() => setOpen(true)}>
            <Edit/>
        </StyledIconButton>
        {open &&
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='xs'>
            <TourneyDialogTitle title='Edit map' onClose={() => setOpen(false)}/>
            <StyledDialogContent>
                {mapTypes.length > 0 &&
                <SubmittedMapFormView 
                    initialValues={map} 
                    mapTypes={mapTypes}
                    validationSchema={validationSchema}
                    onSubmit={async(values) => {
                        setLoading(true);
                        await onSubmit(values);
                        setLoading(false);
                    }}
                />}
            </StyledDialogContent>
            <StyledDialogActions>
                <LoadingButton loading={loading} type='submit' form='submitted-map-form' 
                    sx={{ width: 130 }}>
                    Auto-update
                </LoadingButton>
                <Button variant='contained' color='secondary' 
                    onClick={() => {setOpenManual(true); setOpen(false)}}
                    sx={{ width: 130 }}>
                    Manual edit
                </Button>
            </StyledDialogActions>
        </Dialog>}
        {openManual &&
        <ManualMapEditForm 
            dialogProps={{open: openManual, onClose: () => setOpenManual(false)}}
            initialValues={map}
            mapTypes={mapTypes}
            hasTb={mappool.some(map => map.mapType === TB)}
            isDuplicateId={isDuplicateId}/>}
        </>
    );
}

export default MapEditForm;