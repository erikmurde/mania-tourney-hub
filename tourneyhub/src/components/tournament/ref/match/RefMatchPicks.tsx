import { MenuItem, Paper, Table, TableBody, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import { SchedTableCell } from '../../../styled/SchedTableCell';
import { FieldArray } from 'formik';
import TourneySelectField from '../../field/TourneySelectField';
import { IMapDto } from '../../../../dto/map/IMapDto';
import { MatchStatus } from '../../../../domain/MatchStatus';
import RefSheetPlayerBox from '../../../RefSheetPlayerBox';
import { TERTIARY } from '../../../../constants';
import { StyledTableRow } from '../../../styled/StyledTableRow';
import { useEffect, useState } from 'react';

interface IProps {
    bestOf: number,
    maps: IMapDto[],
    values: MatchStatus
}

const RefMatchPicks = ({bestOf, maps, values}: IProps) => {
    const theme = useTheme();
    const [unselectableMaps, setUnselectableMaps] = useState([] as string[]);
    const players = [values.match.player1.name, values.match.player2.name];

    const getBgColor = (index: number) => {
        if (index === bestOf - 1) {
            return TERTIARY;
        }
        if (players.indexOf(values.firstPick) > 0) {
            index += 1;
        }
        return index % 2 === 0 ? theme.palette.primary.main : theme.palette.error.main;
    }

    useEffect(() => {
        setUnselectableMaps(maps
            .map(map => map.beatmapId)
            .filter(id => values.bans.includes(id) || values.picks.map(pick => pick.beatmapId).includes(id))
        );
    }, [values.picks, values.bans]);

    return (  
        <Paper elevation={8} sx={{ padding: 1 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <SchedTableCell width={150}>Pick</SchedTableCell>
                            <SchedTableCell width={80}>Map</SchedTableCell>
                            <SchedTableCell width={170}>Winner</SchedTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        <FieldArray name='picks'>
                        {() => values.picks.map((pick, index) => 
                            <TableRow key={index}>
                                <SchedTableCell sx={{ border: 0 }}>
                                    <RefSheetPlayerBox name={pick.player} bgColor={getBgColor(index)}/>
                                </SchedTableCell>
                                <SchedTableCell sx={{ border: 0 }}>
                                    <TourneySelectField name={`picks[${index}].beatmapId`} small
                                        options={maps.map((value, index) => 
                                            <MenuItem 
                                                sx={{ display: unselectableMaps.includes(value.beatmapId) ? 'none' : '' }} 
                                                key={index} 
                                                value={value.beatmapId}
                                                >
                                                {value.mapType}{value.index}
                                            </MenuItem>
                                        )}/>
                                </SchedTableCell>
                                <SchedTableCell sx={{ border: 0 }}>
                                    <TourneySelectField name={`picks[${index}].winner`} small
                                        options={players.map((value, index) => 
                                            <MenuItem key={index} value={value}>{value}</MenuItem>
                                        )}/>
                                </SchedTableCell>
                            </TableRow>
                        )}
                        </FieldArray>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
 
export default RefMatchPicks;