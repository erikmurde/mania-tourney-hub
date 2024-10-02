import { TableContainer, Table, TableHead, TableRow, TableBody } from '@mui/material';
import { SchedTableCell } from '../../../styled/SchedTableCell';
import MapStatsTableRowPlayer from './MapStatsTableRowPlayer';
import MapStatsTableRowTeam from './MapStatsTableRowTeam';
import { TeamScoreDto } from '../../../../dto/statistics/TeamScoreDto';
import { PlayerScoreDto } from '../../../../dto/statistics/PlayerScoreDto';

interface IProps {
    showTeams: boolean,
    showRun: boolean,
    scores: TeamScoreDto[] | PlayerScoreDto[]
}

const MapStatsTable = ({showTeams, showRun, scores}: IProps) => {
    return (  
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <SchedTableCell>#</SchedTableCell>
                        <SchedTableCell>{showTeams ? 'team' : 'player'}</SchedTableCell>
                        <SchedTableCell width={70}>Score</SchedTableCell>
                        <SchedTableCell width={70}>{showTeams ? 'Avg. acc' : 'Acc'}</SchedTableCell>
                        {showRun && 
                        <SchedTableCell width={30} align='center'>Run</SchedTableCell>}
                    </TableRow>
                </TableHead>
                {showTeams 
                ?   <TableBody>
                        {(scores as TeamScoreDto[]).map((stats, index) => 
                            <MapStatsTableRowTeam
                                key={index}
                                index={index + 1}
                                stats={stats}
                                showRun={showRun}
                            />
                        )}
                    </TableBody>
                :   <TableBody>
                         {(scores as PlayerScoreDto[]).map((stats, index) => 
                            <MapStatsTableRowPlayer
                                key={index}
                                index={index + 1}
                                stats={stats}
                                showRun={showRun}
                            />
                        )}
                    </TableBody>}
            </Table>
        </TableContainer>
    );
}

export default MapStatsTable;