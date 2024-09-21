import { Button, Dialog, useTheme } from '@mui/material';
import { useState } from 'react';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import ManualMapEditForm from './ManualMapEditForm';
import { IMapDto } from '../../../../dto/map/IMapDto';
import { StyledDialogContent } from '../../../styled/styledDialogContent';
import AutoMapEditFormView from './views/AutoMapEditFormView';
import { StyledIconButton } from '../../../styled/StyledIconButton';
import { Edit } from '@mui/icons-material';
import { TB } from '../../../../constants';

interface IProps {
    mappool: IMapDto[],
    map: IMapDto
}

const MapEditForm = ({mappool, map}: IProps) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [openManual, setOpenManual] = useState(false);

    const onSubmit = (values: IMapDto) => {
        console.log('Auto-update', values);
    }

    const isDuplicateId = (id: number, beatmapId: number | null) => {
        return beatmapId !== null 
            && mappool.some(map => map.id !== id && map.beatmapId === beatmapId);
    }

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
                <AutoMapEditFormView 
                    initialValues={map} 
                    onSubmit={onSubmit}
                    isDuplicateId={isDuplicateId}
                />
            </StyledDialogContent>
            <StyledDialogActions>
                <Button variant='contained' type='submit' form='auto-update-map-form'>
                    Auto-update
                </Button>
                <Button variant='contained' color='secondary' 
                    onClick={() => {setOpenManual(true); setOpen(false)}}>
                    Manual edit
                </Button>
            </StyledDialogActions>
        </Dialog>}
        {openManual &&
        <ManualMapEditForm 
            dialogProps={{open: openManual, onClose: () => setOpenManual(false)}}
            initialValues={map}
            hasTb={mappool.some(map => map.mapType === TB)}
            isDuplicateId={isDuplicateId}/>}
        </>
    );
}

export default MapEditForm;