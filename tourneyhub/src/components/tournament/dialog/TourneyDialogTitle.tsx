import { Close } from '@mui/icons-material';
import { DialogTitle, Box, IconButton, Typography } from '@mui/material';

interface IProps {
    title: string,
    onClose: () => void
}

const TourneyDialogTitle = ({title, onClose}: IProps) => {
    return (  
        <DialogTitle>
            <Box display='flex' alignItems='center'>
                <Typography variant='h4' flexGrow={1} fontSize={26}>
                    {title}
                </Typography>
                <Box>
                    <IconButton onClick={onClose}>
                        <Close/>
                    </IconButton>
                </Box>
            </Box>
        </DialogTitle>
    );
}
 
export default TourneyDialogTitle;