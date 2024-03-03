import { Typography, useTheme } from '@mui/material';
import { IMapDto } from '../../../../dto/map/IMapDto';

interface IProps {
    map: IMapDto,
    manage: boolean
}

const MapText = ({map, manage}: IProps) => {
    const theme = useTheme();

    return (
        <>
            {manage &&
            <>
            <Typography marginBottom={0.5}>
                {map.artist} - {`${map.title} [${map.diff}]`}
            </Typography>
            <Typography variant='body2' color={theme.palette.text.secondary} marginBottom={0.5}>
                <span style={{ marginRight: 30 }}>
                    {`Mapped by ${map.mapper}`}
                </span>
                {`Suggested by ${map.suggestor}`}
            </Typography>
            <Typography variant='body2' marginBottom={1}>
                {map.comment}
            </Typography>
            </>}
            {!manage &&
            <>
            <Typography marginBottom={0.5}>
                {`${map.title} [${map.diff}]`}
            </Typography>
            <Typography variant='body2' color={theme.palette.text.secondary} marginBottom={0.5}>
                {map.artist}
            </Typography>
            <Typography variant='body2' color={theme.palette.text.secondary}>
                {`Mapped by ${map.mapper}`}
            </Typography>
            </>}
        </>
    )
}

export default MapText;