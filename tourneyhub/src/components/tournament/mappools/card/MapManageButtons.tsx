import { Delete, Download, Pause, PlayArrow } from '@mui/icons-material';
import { Grid, IconButton, useTheme } from '@mui/material';
import MapEditForm from '../form/MapEditForm';
import { IMapDto } from '../../../../dto/map/IMapDto';
import ConfirmationDialog from '../../dialog/ConfirmationDialog';
import { StyledIconButton } from '../../../styled/StyledIconButton';
import { useContext } from 'react';
import { UpdateContext } from '../../../../routes/Root';
import { MapService } from '../../../../services/mapService';

interface IProps {
    map: IMapDto,
    mappool: IMapDto[],
    tourneyDone: boolean,
    audioPlaying: boolean,
    handleAudio: (mapId: number, src: string | undefined) => void
}

const MapManageButtons = ({map, mappool, tourneyDone, audioPlaying, handleAudio}: IProps) => {
    const { mapPoolUpdate, setMapPoolUpdate } = useContext(UpdateContext);
    const theme = useTheme();

    const onDelete = async() => {
        await new MapService().delete(map.id);
        setMapPoolUpdate(mapPoolUpdate + 1);
    }

    return (  
        <Grid container justifyContent='end'>
            {map.songPreview &&
            <StyledIconButton 
                color='primary' 
                onClick={() => handleAudio(map.id, map.songPreview)}
                >
                {audioPlaying ? <Pause/> : <PlayArrow/>}
            </StyledIconButton>}
            {!tourneyDone && !map.inMappool &&
            <Grid item> 
                <MapEditForm mappool={mappool} map={map}/>
            </Grid>}
            {!tourneyDone && !map.inMappool && 
            <Grid item>
                <ConfirmationDialog 
                    btnProps={{ sx: {color: theme.palette.error.main }}}
                    btnIcon={<Delete/>}
                    title='Are you sure you wish to delete this map?'
                    actionTitle='Delete'
                    action={() => onDelete()}/>
            </Grid>}
            <Grid item>
                <StyledIconButton 
                    sx={{ color: theme.palette.primary.main }} 
                    onClick={() => window.open(map.download, '_blank')}>
                    <Download/>
                </StyledIconButton>
            </Grid>
        </Grid>
    );
}

export default MapManageButtons;