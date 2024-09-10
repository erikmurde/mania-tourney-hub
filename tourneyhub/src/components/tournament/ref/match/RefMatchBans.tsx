import { MenuItem, Paper, Table, TableBody, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import { SchedTableCell } from '../../../styled/SchedTableCell';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import { IMapDto } from '../../../../dto/map/IMapDto';
import RefSheetPlayerBox from '../../../RefSheetPlayerBox';
import { StyledTableRow } from '../../../styled/StyledTableRow';
import TourneySelectField from '../../field/TourneySelectField';

interface IProps {
    maps: IMapDto[],
    player1: string,
    player2: string
}

const RefMatchBans = ({maps, player1, player2}: IProps) => {
    const theme = useTheme();
    const { tourney } = useTourney();

    return (  
        <Paper elevation={8} sx={{ padding: 1, marginBottom: 1 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <SchedTableCell width={150}>Player</SchedTableCell>
                            {tourney.protects && 
                            <SchedTableCell width={125}>Protect</SchedTableCell>}
                            <SchedTableCell width={125}>Ban</SchedTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <SchedTableCell>
                                <RefSheetPlayerBox name={player1} bgColor={theme.palette.primary.main}/>
                            </SchedTableCell>
                            {tourney.protects && 
                            <SchedTableCell>
                                <TourneySelectField name='protect1' small
                                    options={maps.map((value, index) => 
                                        <MenuItem key={index} value={value.id}>{value.mapType}{value.index}</MenuItem>
                                    )}/>
                            </SchedTableCell>}
                            <SchedTableCell>
                                <TourneySelectField name='ban1' small
                                    options={maps.map((value, index) => 
                                        <MenuItem key={index} value={value.id}>{value.mapType}{value.index}</MenuItem>
                                    )}/>
                            </SchedTableCell>
                        </TableRow>
                        <StyledTableRow>
                            <SchedTableCell>
                                <RefSheetPlayerBox name={player2} bgColor={theme.palette.error.main}/>
                            </SchedTableCell>
                            {tourney.protects && 
                            <SchedTableCell>
                                <TourneySelectField name='protect2' small
                                    options={maps.map((value, index) => 
                                        <MenuItem key={index} value={value.id}>{value.mapType}{value.index}</MenuItem>
                                    )}/>
                            </SchedTableCell>}
                            <SchedTableCell>
                                <TourneySelectField name='ban2' small
                                    options={maps.map((value, index) => 
                                        <MenuItem key={index} value={value.id}>{value.mapType}{value.index}</MenuItem>
                                    )}/>
                            </SchedTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
 
export default RefMatchBans;