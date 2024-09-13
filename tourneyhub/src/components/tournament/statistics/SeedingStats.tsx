import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { SchedTableCell } from '../../styled/SchedTableCell';
import { MapStatsDto } from '../../../dto/statistics/MapStatsDto';
import { PlayerScoreDto } from '../../../dto/score/PlayerScoreDto';
import { UserDtoSimple } from '../../../dto/user/UserDtoSimple';
import { MapStatsService } from '../../../services/mapStatsService';
import { TeamScoreDto } from '../../../dto/score/TeamScoreDto';
import SeedingStatsTableRow from './table/SeedingStatsTableRow';

interface Team {
    name: string,
    logo: string
}

interface IProps {
    mapStats: MapStatsDto[],
    numAdvancing: number,
    teamTourney: boolean
}

const SeedingStats = ({mapStats, numAdvancing, teamTourney}: IProps) => {
    const service = new MapStatsService();

    const rankSums = new Map<string, number>();
    const scores = new Map<string, number[]>();
    const players: UserDtoSimple[] = [];
    const teams: Team[] = [];

    const updateRankSum = (name: string, index: number) => {
        rankSums.set(name, rankSums.has(name) 
            ? rankSums.get(name)! + index 
            : index
        );
    }

    const updateScore = (name: string, score: number) => {
        scores.set(name, scores.has(name)
            ? [...scores.get(name)!, score]
            : [score]
        );
    }

    const updateTeamList = (team: Team) => {
        if (!teams.find(existing => existing.name === team.name)) {
            teams.push(team);
        }
    }

    const updatePlayerList = (player: UserDtoSimple) => {
        if (!players.find(existing => existing.name === player.name)) {
            players.push(player);
        }
    }

    const sortScores = (scores: PlayerScoreDto[] | TeamScoreDto[]) => {
        return teamTourney 
            ?   (scores as TeamScoreDto[]).sort((a, b) => 
                    service.getTeamScore(b) - service.getTeamScore(a)
                )
            :   (scores as PlayerScoreDto[]).sort((a, b) => 
                    b.score - a.score
                );
    }

    mapStats.forEach(map => {
        let seen: string[] = [];
        let index = 1;

        sortScores(map.scores)
        .forEach(stats => {
            if (teamTourney) {
                let team = stats as TeamScoreDto;

                if (!seen.includes(team.name)) {
                    updateTeamList({name: team.name, logo: team.logo});
                    updateRankSum(team.name, index);
                
                    index++;
                    seen.push(team.name);
                }
                updateScore(team.name, service.getTeamScore(team));
            } else {
                let player = stats as PlayerScoreDto
                let name = player.player.name;

                if (!seen.includes(name)) {
                    updatePlayerList(player.player);
                    updateRankSum(name, index);

                    index++;
                    seen.push(name);
                }
                updateScore(name, player.score);
            }
        });
    });
    
    const result = teamTourney 
    ?   teams.map(team => ({
            team: team,
            rankSum: rankSums.get(team.name)!, 
            avgScore: Math.round(
                scores.get(team.name)!.reduce((elem, sum) => sum + elem, 0) / scores.get(team.name)!.length
            )
        }))
    :   players.map(player => ({ 
            player: player, 
            rankSum: rankSums.get(player.name)!, 
            avgScore: Math.round(
                scores.get(player.name)!.reduce((elem, sum) => sum + elem, 0) / scores.get(player.name)!.length
            )
        }));

    return (  
        <Paper elevation={6} sx={{ paddingLeft: 1, paddingRight: 1, width: 540 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <SchedTableCell>#</SchedTableCell>
                            <SchedTableCell>{teamTourney ? 'team' : 'player'}</SchedTableCell>
                            <SchedTableCell>Rank sum</SchedTableCell>
                            <SchedTableCell>Avg. score</SchedTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result
                            .sort((a, b) => a.rankSum - b.rankSum || b.avgScore - a.avgScore)
                            .map((stats, index) => 
                                <SeedingStatsTableRow
                                    key={index}
                                    index={index + 1}
                                    numAdvancing={numAdvancing}
                                    stats={stats}
                                />    
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default SeedingStats;