import { Grid, Typography, Divider } from '@mui/material';
import CopyClipboard from './CopyClipboard';

interface IProps {
    roomTitle: string,
    roomCommand: string
}

const RoomTitle = ({roomTitle, roomCommand}: IProps) => {
    return (  
        <>
        <Grid item xs={12} height={50} alignContent='center'>
            <Typography fontWeight={500} paddingLeft={0.5}>
                {roomTitle}
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Divider/>
        </Grid>
        <Grid item xs={11} height={50} alignContent='center'>
            <Typography fontSize={14} paddingLeft={0.5}>
                {roomCommand}
            </Typography>
        </Grid>
        <Grid item xs textAlign='end'>
            <CopyClipboard text={roomCommand}/>
        </Grid>
        </>
    );
}
 
export default RoomTitle;