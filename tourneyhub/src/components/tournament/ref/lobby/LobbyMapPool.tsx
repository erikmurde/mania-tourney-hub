import { Button, Table, TableBody, TableContainer, TableHead, Typography, useTheme } from '@mui/material';
import { RefSheetPaper } from '../../../styled/RefSheetPaper';
import { SchedTableCell } from '../../../styled/SchedTableCell';
import { IMapDto } from '../../../../dto/map/IMapDto';
import { StyledTableRow } from '../../../styled/StyledTableRow';
import MapTypeBox from '../../../MapTypeBox';
import CopyClipboard from '../CopyClipboard';
import { RefTableCell } from '../../../styled/RefTableCell';
import { useEffect, useState } from 'react';

interface IProps {
    maps: IMapDto[],
    selectedId: number | null,
    setSelectedId: (id: number) => void
}

const LobbyMapPool = ({maps, selectedId, setSelectedId}: IProps) => {
    const theme = useTheme();
    const [lobbyMaps, setLobbyMaps] = useState([] as { map: IMapDto, playedCount: number }[]);

    useEffect(() => {
        setLobbyMaps(maps.map(map => ({ map: map, playedCount: 0 })));
    }, [maps]);

    return (  
        <RefSheetPaper elevation={8} sx={{ height: 1 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <SchedTableCell colSpan={2}>Map</SchedTableCell>
                            <SchedTableCell width={140}>Command</SchedTableCell>
                            <SchedTableCell>#Played</SchedTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {lobbyMaps.map(({map, playedCount}, index) => 
                            <StyledTableRow key={map.id} sx={{ 
                                boxShadow: selectedId === map.beatmapId ? `inset 0px 0px 0px 2px ${theme.palette.success.main}` : 'none',
                                borderRadius: 1
                            }}>
                                <RefTableCell>
                                    <Button onClick={() => {
                                        let newMaps = [...lobbyMaps];
                                        newMaps[index] = { 
                                            map: map, 
                                            playedCount: map.beatmapId === selectedId ? playedCount : playedCount + 1 
                                        };
                                        setSelectedId(map.beatmapId);
                                        setLobbyMaps(newMaps);
                                    }}>
                                        <MapTypeBox 
                                            mapType={map.mapType} 
                                            index={map.index} 
                                            fontSize={14} 
                                            width={45} 
                                            height={25}/>
                                    </Button>
                                </RefTableCell>
                                <RefTableCell>
                                    <Typography fontSize={12}>
                                        {map.artist} - {map.title} [{map.diff}]
                                    </Typography>
                                </RefTableCell>
                                <RefTableCell sx={{ paddingRight: 0 }}>
                                    <Typography 
                                        fontSize={12}>
                                        !mp map {map.beatmapId} 3
                                        <CopyClipboard text={`!mp map ${map.beatmapId} 3`}/>
                                    </Typography>
                                </RefTableCell>
                                <RefTableCell align='center'>
                                    {playedCount}
                                </RefTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </RefSheetPaper>
    );
}
 
export default LobbyMapPool;