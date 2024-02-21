import { Box, Typography, useTheme } from '@mui/material';
import { TERTIARY } from '../constants';
import { IMapDto } from '../dto/map/IMapDto';

const MapTypeBox = (props: {map: IMapDto}) => {
    const theme = useTheme();

    const bgMappings = new Map<string, string>([
        ['RC', theme.palette.primary.dark],
        ['LN', theme.palette.error.main],
        ['HB', theme.palette.secondary.dark],
        ['SV', theme.palette.success.main],
        ['TB', TERTIARY]
    ]);

    return (  
        <Box className='flex-center map-type-box' bgcolor={bgMappings.get(props.map.mapType.name)}>
            <Typography fontSize={20} color={theme.palette.background.default}>
                {`${props.map.mapType.name}${props.map.index > 0 ? props.map.index : ''}`}
            </Typography>
        </Box>
    );
}
 
export default MapTypeBox;