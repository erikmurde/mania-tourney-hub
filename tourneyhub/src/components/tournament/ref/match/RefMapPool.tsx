import { Grid, IconButton, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';
import { IMapDto } from '../../../../dto/map/IMapDto';
import { SchedTableCell } from '../../../styled/SchedTableCell';
import MapTypeBox from '../../../MapTypeBox';
import { ContentCopy } from '@mui/icons-material';
import { StyledTableRow } from '../../../styled/StyledTableRow';

interface IProps {
    maps: IMapDto[],
    picks: string[]
}

const RefMapPool = ({maps, picks}: IProps) => {
    const theme = useTheme();

    const isMapPicked = (map: IMapDto) => {
        return picks.includes(map.id);
    }

    return (  
        <Paper elevation={8} sx={{ padding: 1 }}>
            <Grid item>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ height: 50 }}>
                            <TableRow>
                                <SchedTableCell colSpan={2}>Map</SchedTableCell>
                                <SchedTableCell width={115}>Command</SchedTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {maps.map(map => 
                                <StyledTableRow className={isMapPicked(map) ? 'map-picked' : ''}>
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
                                            color={isMapPicked(map) ? theme.palette.text.disabled : theme.palette.text.primary}>
                                            {map.artist} - {map.title} [{map.diff}]
                                        </Typography>
                                    </SchedTableCell>
                                    <SchedTableCell sx={{ paddingRight: 0 }}>
                                        <Typography 
                                            fontSize={12}
                                            color={isMapPicked(map) ? theme.palette.text.disabled : theme.palette.text.primary}>
                                            !mp map {map.beatmapId} 3
                                        </Typography>
                                    </SchedTableCell>
                                    <SchedTableCell sx={{ paddingLeft: 0 }}>
                                        <IconButton size='small' 
                                            disabled={isMapPicked(map)}
                                            sx={{ color: isMapPicked(map) ? theme.palette.text.disabled : theme.palette.primary.main }}>
                                            <ContentCopy/>
                                        </IconButton>
                                    </SchedTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Paper>
    );
}
 
export default RefMapPool;