import { Box, Typography, useTheme } from '@mui/material';
import { HB, LN, RC, SV, TB, TERTIARY } from '../constants';

interface IProps {
    mapType: string,
    index: number,
    height?: number,
    width?: number,
    fontSize?: number
}

const MapTypeBox = ({mapType, index, height, width, fontSize}: IProps) => {
    const theme = useTheme();

    const bgMappings = new Map<string, string>([
        [RC, theme.palette.primary.dark],
        [LN, theme.palette.error.main],
        [HB, theme.palette.secondary.dark],
        [SV, theme.palette.success.main],
        [TB, TERTIARY]
    ]);

    return (  
        <Box 
            className='flex-center' 
            bgcolor={bgMappings.get(mapType)} 
            sx={{
                height: height ?? 30,
                width: width ?? 100,
                borderRadius: '3px'
            }}>
            <Typography fontSize={fontSize ?? 20} fontWeight={500} color={theme.palette.background.default}>
                {`${mapType}${index > 0 ? index : ''}`}
            </Typography>
        </Box>
    );
}
 
export default MapTypeBox;