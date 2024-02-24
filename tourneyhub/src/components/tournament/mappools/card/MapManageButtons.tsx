import { Delete, Download } from '@mui/icons-material';
import { CardActions, IconButton, useTheme } from '@mui/material';
import MapEditForm from '../form/MapEditForm';
import { IMapDto } from '../../../../dto/map/IMapDto';
import ConfirmationDialog from '../../dialog/ConfirmationDialog';

const MapManageButtons = ({map}: {map: IMapDto}) => {
    const theme = useTheme();

    return (  
        <CardActions sx={{ paddingTop: 0.3, alignItems: 'start' }}>
            <MapEditForm map={map}/>
            {map.inMappool 
                ?   <></>
                :   <ConfirmationDialog 
                        btnProps={{ sx: {color: theme.palette.error.main, margin: '0 !important'}}}
                        btnIcon={<Delete/>}
                        title='Are you sure you wish to delete this map?'
                        actionTitle='Delete'
                        action={() => console.log('deleting...')}/>}
            <IconButton 
                sx={{ color: theme.palette.primary.main, margin: '0 !important'}} 
                href={map.download}
                target='_blank'>
                <Download/>
            </IconButton>
        </CardActions>
    );
}

export default MapManageButtons;