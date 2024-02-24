import { Close } from '@mui/icons-material';
import { DialogTitle, Box, IconButton, Typography } from '@mui/material';

interface IProps {
    title: string,
    fontSize?: number,
    onClose: () => void
}

const TourneyDialogTitle = ({title, fontSize, onClose}: IProps) => {
    return (  
        <DialogTitle>
            <Box display='flex' alignItems='center'>
                <Typography variant='h4' flexGrow={1} fontSize={fontSize ?? 26}>
                    {title}
                </Typography>
                <Box marginLeft={3}>
                    <IconButton onClick={onClose}>
                        <Close/>
                    </IconButton>
                </Box>
            </Box>
        </DialogTitle>
    );
}

export default TourneyDialogTitle;