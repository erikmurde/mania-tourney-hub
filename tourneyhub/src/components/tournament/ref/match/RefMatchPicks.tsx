import { MenuItem, Paper, Table, TableBody, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import { SchedTableCell } from '../../../styled/SchedTableCell';
import { FieldArray } from 'formik';
import TourneySelectField from '../../field/TourneySelectField';
import { IMapDto } from '../../../../dto/map/IMapDto';
import { MatchStatus } from '../../../../domain/MatchStatus';
import RefSheetPlayerBox from '../../../RefSheetPlayerBox';
import { TERTIARY } from '../../../../constants';
import { StyledTableRow } from '../../../styled/StyledTableRow';

interface IProps {
    bestOf: number,
    maps: IMapDto[],
    values: MatchStatus
}

const RefMatchPicks = ({bestOf, maps, values}: IProps) => {
    const theme = useTheme();
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

    return (  
        <Paper elevation={8} sx={{ padding: 1 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <SchedTableCell width={150}>Pick</SchedTableCell>
                            <SchedTableCell width={80}>Map</SchedTableCell>
                            <SchedTableCell width={170}>Winner</SchedTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <FieldArray name='picks'>
                        {() => values.picks.map((pick, index) => 
                            <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <SchedTableCell>
                                    <RefSheetPlayerBox name={pick.player} bgColor={getBgColor(index)}/>
                                </SchedTableCell>
                                <SchedTableCell>
                                    <TourneySelectField name={`picks[${index}].map`} small
                                        options={maps.map((value, index) => 
                                            <MenuItem key={index} value={value.id}>{value.mapType}{value.index}</MenuItem>
                                        )}/>
                                </SchedTableCell>
                                <SchedTableCell>
                                    <TourneySelectField name={`picks[${index}].winner`} small
                                        options={players.map((value, index) => 
                                            <MenuItem key={index} value={value}>{value}</MenuItem>
                                        )}/>
                                </SchedTableCell>
                            </StyledTableRow>
                        )}
                        </FieldArray>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
 
export default RefMatchPicks;