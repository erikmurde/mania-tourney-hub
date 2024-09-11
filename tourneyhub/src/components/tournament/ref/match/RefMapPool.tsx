import { Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';
import { IMapDto } from '../../../../dto/map/IMapDto';
import { SchedTableCell } from '../../../styled/SchedTableCell';
import MapTypeBox from '../../../MapTypeBox';
import { StyledTableRow } from '../../../styled/StyledTableRow';
import CopyClipboard from '../CopyClipboard';
import { RefSheetPaper } from '../../../styled/RefSheetPaper';

interface IProps {
    maps: IMapDto[],
    picks: string[],
    bans: string[],
    protects: string[]
}

const RefMapPool = ({maps, picks, bans, protects}: IProps) => {
    const theme = useTheme();

    const isMapDisabled = (map: IMapDto) => {
        return bans.includes(map.beatmapId) || picks.includes(map.beatmapId);
    }

    const getBorder = (map: IMapDto) => {
        let border = '2px solid ';

        if (bans.includes(map.beatmapId)) {
            return border + theme.palette.error.main;
        }
        else if (picks.includes(map.beatmapId)) {
            return border + theme.palette.success.main;
        }
        else if (protects.includes(map.beatmapId)) {
            return border + theme.palette.warning.main;
        }
        return 'none';
    }

    const getTextColor = (map: IMapDto) => {
        return isMapDisabled(map) ? theme.palette.text.disabled : theme.palette.text.primary; 
    }

    return (  
        <RefSheetPaper elevation={8} sx={{ height: 1 }}>
            <Grid item>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ height: 50 }}>
                            <TableRow>
                                <SchedTableCell colSpan={2}>Map</SchedTableCell>
                                <SchedTableCell width={115}>Command</SchedTableCell>
                                <SchedTableCell></SchedTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {maps.map(map => 
                                <StyledTableRow sx={{ border: getBorder(map) }}>
                                    <SchedTableCell>
                                        <MapTypeBox 
                                            mapType={map.mapType} 
                                            index={map.index} 
                                            fontSize={14} 
                                            width={45} 
                                            height={25}
                                        />
                                    </SchedTableCell>
                                    <SchedTableCell>
                                        <Typography 
                                            fontSize={12}
                                            color={getTextColor(map)}>
                                            {map.artist} - {map.title} [{map.diff}]
                                        </Typography>
                                    </SchedTableCell>
                                    <SchedTableCell sx={{ paddingRight: 0 }}>
                                        <Typography 
                                            fontSize={12}
                                            color={getTextColor(map)}>
                                            !mp map {map.beatmapId} 3
                                        </Typography>
                                    </SchedTableCell>
                                    <SchedTableCell sx={{ paddingLeft: 0 }}>
                                        <CopyClipboard text={`!mp map ${map.beatmapId} 3`} disabled={isMapDisabled(map)}/>
                                    </SchedTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </RefSheetPaper>
    );
}
 
export default RefMapPool;