import { Delete, Download } from '@mui/icons-material';
import { Grid, useTheme } from '@mui/material';
import MapEditForm from '../form/MapEditForm';
import { IMapDto } from '../../../../dto/map/IMapDto';
import ConfirmationDialog from '../../dialog/ConfirmationDialog';
import { StyledIconButton } from '../../../styled/StyledIconButton';

const MapManageButtons = ({map}: {map: IMapDto}) => {
    const theme = useTheme();

    return (  
        <Grid container justifyContent='end'>
            <Grid item> 
                <MapEditForm map={map}/>
            </Grid>
            <Grid item>
                {!map.inMappool &&
                <ConfirmationDialog 
                    btnProps={{ sx: {color: theme.palette.error.main }}}
                    btnIcon={<Delete/>}
                    title='Are you sure you wish to delete this map?'
                    actionTitle='Delete'
                    action={() => console.log('deleting...')}/>}
            </Grid>
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