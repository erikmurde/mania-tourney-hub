import { TableContainer, Table, TableHead, TableRow, TableBody } from '@mui/material';
import { SchedTableCell } from '../../../styled/SchedTableCell';
import MapStatsTableRowPlayer from './MapStatsTableRowPlayer';
import { TeamScoreDto } from '../../../../dto/score/TeamScoreDto';
import { PlayerScoreDto } from '../../../../dto/score/PlayerScoreDto';
import MapStatsTableRowTeam from './MapStatsTableRowTeam';

interface IProps {
    showTeams: boolean,
    scores: TeamScoreDto[] | PlayerScoreDto[]
}

const MapStatsTable = ({showTeams, scores}: IProps) => {
    return (  
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <SchedTableCell>#</SchedTableCell>
                        <SchedTableCell>{showTeams ? 'team' : 'player'}</SchedTableCell>
                        <SchedTableCell width={70}>Score</SchedTableCell>
                        <SchedTableCell width={70}>{showTeams ? 'Avg. acc' : 'Acc'}</SchedTableCell>
                    </TableRow>
                </TableHead>
                {showTeams 
                ?   <TableBody>
                        {(scores as TeamScoreDto[]).map((stats, index) => 
                            <MapStatsTableRowTeam
                                key={index}
                                index={index + 1}
                                stats={stats}
                            />
                        )}
                    </TableBody>
                :   <TableBody>
                         {(scores as PlayerScoreDto[]).map((stats, index) => 
                            <MapStatsTableRowPlayer
                                key={index}
                                index={index + 1}
                                stats={stats}
                            />
                        )}
                    </TableBody>}
            </Table>
        </TableContainer>
    );
}

export default MapStatsTable;