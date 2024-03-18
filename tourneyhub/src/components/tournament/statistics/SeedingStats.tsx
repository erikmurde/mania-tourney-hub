import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { SchedTableCell } from '../../styled/SchedTableCell';
import { MapStatsDto } from '../../../dto/statistics/MapStatsDto';
import { PlayerScoreDto } from '../../../dto/score/PlayerScoreDto';
import { EventParticipantDto } from '../../../dto/user/EventParticipantDto';
import SeedingStatsTableRowPlayer from './table/SeedingStatsTableRowPlayer';

interface IProps {
    mapStats: MapStatsDto[],
    numAdvancing: number
}

const SeedingStats = ({mapStats, numAdvancing}: IProps) => {
    const rankSums = new Map<string, number>();
    const playerScores = new Map<string, number[]>();
    const players: EventParticipantDto[] = [];

    const updateRankSum = (name: string, index: number) => {
        rankSums.set(name, rankSums.has(name) 
            ? rankSums.get(name)! + index 
            : index
        );
    }

    const updatePlayerScore = (name: string, score: number) => {
        playerScores.set(name, playerScores.has(name)
            ? [...playerScores.get(name)!, score]
            : [score]
        );
    }

    const updatePlayerList = (player: EventParticipantDto) => {
        if (!players.find(existing => existing.name === player.name)) {
            players.push(player);
        }
    }

    mapStats.forEach(map => {
        let seen: string[] = [];
        let index = 1;

        (map.scores as PlayerScoreDto[])
        .sort((a, b) => b.score - a.score)
        .forEach(playerScore => {

            let name = playerScore.player.name;
   
            if (!seen.includes(name)) {
                updatePlayerList(playerScore.player);
                updateRankSum(name, index);
                updatePlayerScore(name, playerScore.score);

                index++;
                seen.push(name);
            }
        });
    });
    
    const result = players.map(player => ({ 
        player: player, 
        rankSum: rankSums.get(player.name)!, 
        avgScore: Math.round(
            playerScores.get(player.name)!.reduce((elem, sum) => sum + elem, 0) / playerScores.get(player.name)!.length
        )
    }));

    return (  
        <Paper elevation={6} sx={{ paddingLeft: 1, paddingRight: 1, width: 540 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <SchedTableCell>#</SchedTableCell>
                            <SchedTableCell>Player</SchedTableCell>
                            <SchedTableCell>Rank sum</SchedTableCell>
                            <SchedTableCell>Avg. score</SchedTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result
                            .sort((a, b) => a.rankSum - b.rankSum || b.avgScore - a.avgScore)
                            .map((playerStats, index) => 
                                <SeedingStatsTableRowPlayer
                                    key={index}
                                    index={index + 1}
                                    numAdvancing={numAdvancing}
                                    playerStats={playerStats}
                                />    
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default SeedingStats;