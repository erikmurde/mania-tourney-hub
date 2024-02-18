import { Edit, Delete, Download } from '@mui/icons-material';
import { CardActions, IconButton, useTheme } from '@mui/material';

const MapManageButtons = (props: {download: string, inMappool: boolean}) => {
    const theme = useTheme();

    return (  
        <CardActions sx={{ paddingTop: 0.3, alignItems: 'start' }}>
            <IconButton
                sx={{ color: theme.palette.primary.main}} 
                onClick={() => {}}>
                <Edit/>
            </IconButton>
            {props.inMappool 
                ?   <></>
                :   <IconButton 
                        sx={{ color: theme.palette.error.main, margin: '0 !important'}} 
                        onClick={() => {}}>
                        <Delete/>
                    </IconButton>}
            <IconButton 
                sx={{ color: theme.palette.primary.main, margin: '0 !important'}} 
                href={props.download}
                target='_blank'>
                <Download/>
            </IconButton>
        </CardActions>
    );
}

export default MapManageButtons;