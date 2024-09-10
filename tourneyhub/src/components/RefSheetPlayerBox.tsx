import { Box, Typography, useTheme } from '@mui/material';

interface IProps {
    name: string,
    bgColor: string
}

const RefSheetPlayerBox = ({name, bgColor}: IProps) => {
    const theme = useTheme();

    return (  
        <Box className='flex-center' 
            bgcolor={bgColor} 
            sx={{
                height: 40,
                width: 150,
                borderRadius: '3px'
            }}>
            <Typography fontSize={14} fontWeight={500} color={theme.palette.background.default}>
                {name}
            </Typography>
        </Box>
    );
}
 
export default RefSheetPlayerBox;