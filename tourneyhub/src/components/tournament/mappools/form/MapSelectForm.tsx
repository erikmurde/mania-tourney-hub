import { Button, Dialog } from '@mui/material';
import { useState } from 'react';
import SubmittedMapForm from './SubmittedMapCreateForm';
import UnsubmittedMapForm from './UnsubmittedMapCreateForm';
import TourneyDialogTitle from '../../dialog/TourneyDialogTitle';
import { StyledDialogActions } from '../../../styled/StyledDialogActions';
import { PlaylistAdd } from '@mui/icons-material';
import { IMapDto } from '../../../../dto/map/IMapDto';
import { TB } from '../../../../constants';

interface IProps {
    stageId: number,
    mappool: IMapDto[]
}

const MapSelectForm = ({stageId, mappool}: IProps) => {
    const [open, setOpen] = useState(false);
    const [openSubmitted, setOpenSubmitted] = useState(false);
    const [openUnsubmitted, setOpenUnsubmitted] = useState(false);

    const hasTb = mappool.some(map => map.mapType === TB);

    return (
        <>
        <Button variant='contained' startIcon={<PlaylistAdd/>} sx={{ width: 150 }}
            onClick={() => setOpen(true)}>
            Add Map
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='xs'>
            <TourneyDialogTitle title='Add new map' onClose={() => setOpen(false)}/>
            <StyledDialogActions>
                <Button variant='contained' 
                    onClick={() => {setOpenSubmitted(true); setOpen(false)}}>
                    Submitted
                </Button>
                <Button variant='contained' color='secondary' 
                    onClick={() => {setOpenUnsubmitted(true); setOpen(false)}}>
                    Unsubmitted
                </Button>
            </StyledDialogActions>
        </Dialog>
        <UnsubmittedMapForm 
            dialogProps={{ open: openUnsubmitted, onClose: () => setOpenUnsubmitted(false) }}
            hasTb={hasTb}
            stageId={stageId}
        />
        <SubmittedMapForm 
            dialogProps={{ open: openSubmitted, onClose: () => setOpenSubmitted(false) }}
            hasTb={hasTb}
            stageId={stageId}
            isDuplicateId={(beatmapId) => mappool.some(map => map.beatmapId === beatmapId)}
        />
        </>
    );
}

export default MapSelectForm;