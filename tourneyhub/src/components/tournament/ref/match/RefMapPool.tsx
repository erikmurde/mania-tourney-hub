import { Grid, Table, TableBody, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';
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
        let border = 'inset 0px 0px 0px 2px ';

        if (bans.includes(map.beatmapId)) {
            return border + theme.palette.error.main;
        }
        else if (picks.includes(map.beatmapId)) {
            return border + theme.palette.success.main;
        }
        else if (protects.includes(map.beatmapId)) {
            return border + theme.palette.warning.main;
        }
        return '';
    }

    const getTextColor = (map: IMapDto) => {
        return isMapDisabled(map) ? theme.palette.text.disabled : theme.palette.text.primary; 
    }

    return (  
        <RefSheetPaper elevation={8} sx={{ height: 1 }}>
            <Grid item>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ height: 50 }}>
                                <SchedTableCell colSpan={2}>Map</SchedTableCell>
                                <SchedTableCell width={115}>Command</SchedTableCell>
                                <SchedTableCell></SchedTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {maps.map(map => {
                                const textColor = getTextColor(map);
                                return (
                                <StyledTableRow key={map.id} sx={{ boxShadow: getBorder(map), borderRadius: 1 }}>
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
                                            color={textColor}>
                                            {map.artist} - {map.title} [{map.diff}]
                                        </Typography>
                                    </SchedTableCell>
                                    <SchedTableCell sx={{ paddingRight: 0 }}>
                                        <Typography 
                                            fontSize={12}
                                            color={textColor}>
                                            !mp map {map.beatmapId} 3
                                        </Typography>
                                    </SchedTableCell>
                                    <SchedTableCell sx={{ paddingLeft: 0 }}>
                                        <CopyClipboard text={`!mp map ${map.beatmapId} 3`} disabled={isMapDisabled(map)}/>
                                    </SchedTableCell>
                                </StyledTableRow>)
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </RefSheetPaper>
    );
}
 
export default RefMapPool;