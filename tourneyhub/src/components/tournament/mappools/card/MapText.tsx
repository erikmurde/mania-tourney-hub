import { Typography, useTheme } from '@mui/material';
import { IMapDto } from '../../../../dto/map/IMapDto';

interface IProps {
    map: IMapDto,
    manage: boolean
}

const MapText = (props: IProps) => {
    const theme = useTheme();

    if (props.manage){
        return (  
            <>
                <Typography marginBottom={0.5}>
                    {props.map.artist} - {`${props.map.title} [${props.map.diff}]`}
                </Typography>
                <Typography variant='body2' color={theme.palette.text.secondary} marginBottom={0.5}>
                    <span style={{ marginRight: 30 }}>
                        {`Mapped by ${props.map.mapper}`}
                    </span>
                    {`Suggested by ${props.map.suggestor}`}
                </Typography>
                <Typography variant='body2' marginBottom={1}>
                    {props.map.comment}
                </Typography>
            </>
        );
    } else {
        return (
            <>
                <Typography marginBottom={0.5}>
                    {`${props.map.title} [${props.map.diff}]`}
                </Typography>
                <Typography variant='body2' color={theme.palette.text.secondary} marginBottom={0.5}>
                    {props.map.artist}
                </Typography>
                <Typography variant='body2' color={theme.palette.text.secondary}>
                    {`Mapped by ${props.map.mapper}`}
                </Typography>
            </>
        );
    }

}
 
export default MapText;