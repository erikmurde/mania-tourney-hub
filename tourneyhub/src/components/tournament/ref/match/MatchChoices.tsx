import { MenuItem, Table, TableBody, TableContainer, TableHead, useTheme } from '@mui/material';
import { SchedTableCell } from '../../../styled/SchedTableCell';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import { IMapDto } from '../../../../dto/map/IMapDto';
import RefSheetPlayerBox from '../../../RefSheetPlayerBox';
import { StyledTableRow } from '../../../styled/StyledTableRow';
import TourneySelectField from '../../field/TourneySelectField';
import { RefSheetPaper } from '../../../styled/RefSheetPaper';
import { RefTableCell } from '../../../styled/RefTableCell';
import { TB } from '../../../../constants';

interface IProps {
    maps: IMapDto[],
    player1: string,
    player2: string,
    bans: number[],
    protects: number[]
}

const MatchChoices = ({maps, player1, player2, bans, protects}: IProps) => {
    const theme = useTheme();
    const { tourney } = useTourney();

    return (  
        <RefSheetPaper elevation={8} sx={{ marginBottom: 1, paddingBottom: 1 }}>
            <TableContainer sx={{ marginBottom: 2 }}>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <SchedTableCell width={150}>Player</SchedTableCell>
                            {tourney.protects && 
                            <SchedTableCell width={115}>Protect</SchedTableCell>}
                            <SchedTableCell>Ban</SchedTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {[player1, player2].map((player, index) => 
                            <StyledTableRow key={index}>
                                <RefTableCell>
                                    <RefSheetPlayerBox 
                                        name={player} 
                                        bgColor={player === player1 ? theme.palette.primary.main : theme.palette.error.main}/>
                                </RefTableCell>
                                {tourney.protects && 
                                <RefTableCell>
                                    <TourneySelectField name={`protects[${index}]`} small
                                        options={maps.map((value, index) => 
                                            <MenuItem 
                                                sx={{ 
                                                    display: bans.includes(value.beatmapId) || value.mapType === TB ? 'none' : ''
                                                }} 
                                                key={index} 
                                                value={value.beatmapId}
                                                >
                                                {value.mapType}{value.index}
                                            </MenuItem>
                                        )}/>
                                </RefTableCell>}
                                <RefTableCell>
                                    <TourneySelectField name={`bans[${index}]`} small
                                        options={maps.map((value, index) => 
                                            <MenuItem 
                                                sx={{ 
                                                    display: protects.includes(value.beatmapId) || value.mapType === TB ? 'none' : ''
                                                }} 
                                                key={index} 
                                                value={value.beatmapId}
                                                >
                                                {value.mapType}{value.index}
                                            </MenuItem>
                                        )}/>
                                </RefTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TourneySelectField name='firstPick' label='First pick' small
                options={[player1, player2].map((value, index) => 
                    <MenuItem key={index} value={value}>{value}</MenuItem>
                )}/>
        </RefSheetPaper>
    );
}
 
export default MatchChoices;