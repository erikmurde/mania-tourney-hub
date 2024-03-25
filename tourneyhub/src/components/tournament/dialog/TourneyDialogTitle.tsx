import { Close } from '@mui/icons-material';
import { DialogTitle, Box, IconButton, Typography, Divider } from '@mui/material';

interface IProps {
    title: string,
    fontSize?: number,
    onClose: () => void
}

const TourneyDialogTitle = ({title, fontSize, onClose}: IProps) => {
    return (  
        <DialogTitle>
            <Box display='flex' alignItems='center' marginBottom={1}>
                <Typography flexGrow={1} fontSize={fontSize ?? 26} fontWeight={500}>
                    {title}
                </Typography>
                <Box marginLeft={3}>
                    <IconButton onClick={onClose}>
                        <Close/>
                    </IconButton>
                </Box>
            </Box>
            <Divider/>
        </DialogTitle>
    );
}

export default TourneyDialogTitle;