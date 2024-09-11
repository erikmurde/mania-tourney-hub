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
    player2: string,
    bans: string[],
    protects: string[]
}

const RefMatchChoices = ({maps, player1, player2, bans, protects}: IProps) => {
    const theme = useTheme();
    const { tourney } = useTourney();

    return (  
        <Paper elevation={8} sx={{ padding: 1, marginBottom: 1 }}>
            <TableContainer sx={{ marginBottom: 2 }}>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <SchedTableCell width={150}>Player</SchedTableCell>
                            {tourney.protects && 
                            <SchedTableCell width={125}>Protect</SchedTableCell>}
                            <SchedTableCell width={125}>Ban</SchedTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {[player1, player2].map((player, index) => 
                            <StyledTableRow>
                                <SchedTableCell sx={{ border: 0 }}>
                                    <RefSheetPlayerBox 
                                        name={player} 
                                        bgColor={player === player1 ? theme.palette.primary.main : theme.palette.error.main}/>
                                </SchedTableCell>
                                {tourney.protects && 
                                <SchedTableCell sx={{ border: 0 }}>
                                    <TourneySelectField name={`protects[${index}]`} small
                                        options={maps.map((value, index) => 
                                            <MenuItem 
                                                sx={{ display: bans.includes(value.beatmapId) ? 'none' : '' }} 
                                                key={index} 
                                                value={value.beatmapId}
                                                >
                                                {value.mapType}{value.index}
                                            </MenuItem>
                                        )}/>
                                </SchedTableCell>}
                                <SchedTableCell sx={{ border: 0 }}>
                                    <TourneySelectField name={`bans[${index}]`} small
                                        options={maps.map((value, index) => 
                                            <MenuItem 
                                                sx={{ display: protects.includes(value.beatmapId) ? 'none' : '' }} 
                                                key={index} 
                                                value={value.beatmapId}
                                                >
                                                {value.mapType}{value.index}
                                            </MenuItem>
                                        )}/>
                                </SchedTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TourneySelectField name='firstPick' label='First pick' small
                options={[player1, player2].map((value, index) => 
                    <MenuItem key={index} value={value}>{value}</MenuItem>
                )}/>
        </Paper>
    );
}
 
export default RefMatchChoices;